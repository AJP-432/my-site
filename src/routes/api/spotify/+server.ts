import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
	SPOTIFY_CLIENT_ID,
	SPOTIFY_CLIENT_SECRET,
	SPOTIFY_REFRESH_TOKEN
} from '$env/static/private';

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=3';

async function getAccessToken(): Promise<{ access_token: string } | null> {
	const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');

	const response = await fetch(TOKEN_ENDPOINT, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${basic}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: SPOTIFY_REFRESH_TOKEN
		})
	});

	if (!response.ok) {
		console.error('Failed to get access token:', response.status, response.statusText);
		return null;
	}

	return response.json();
}

async function getNowPlaying(accessToken: string) {
	return fetch(NOW_PLAYING_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});
}

async function getRecentlyPlayed(accessToken: string) {
	return fetch(RECENTLY_PLAYED_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});
}

import type { SpotifyTrack } from '$lib/types/spotify';

export const GET: RequestHandler = async () => {
	try {
		const tokenResult = await getAccessToken();
		if (!tokenResult) {
			return json({ isPlaying: false, recentTracks: [] });
		}
		const { access_token } = tokenResult;

		// Fetch now playing and recently played
		const [nowPlayingResponse, recentlyPlayedResponse] = await Promise.all([
			getNowPlaying(access_token),
			getRecentlyPlayed(access_token)
		]);

		let isPlaying = false;
		let currentTrack: SpotifyTrack | null = null;

		// Check if currently playing
		if (nowPlayingResponse.status !== 204 && nowPlayingResponse.status <= 400) {
			const song = await nowPlayingResponse.json();
			if (song.item && song.is_playing) {
				isPlaying = true;
				currentTrack = {
					title: song.item.name,
					artist: song.item.artists.map((artist: { name: string }) => artist.name).join(', '),
					album: song.item.album.name,
					albumImageUrl: song.item.album.images[0]?.url,
					songUrl: song.item.external_urls.spotify
				};
			}
		}

		// Get recently played tracks
		const recentTracks: SpotifyTrack[] = [];
		if (recentlyPlayedResponse.ok) {
			const recentData = await recentlyPlayedResponse.json();
			if (recentData.items) {
				for (const item of recentData.items) {
					const track = item.track;
					recentTracks.push({
						title: track.name,
						artist: track.artists.map((artist: { name: string }) => artist.name).join(', '),
						album: track.album.name,
						albumImageUrl: track.album.images[0]?.url,
						songUrl: track.external_urls.spotify
					});
				}
			}
		}

		return json({
			isPlaying,
			currentTrack,
			recentTracks
		});
	} catch (error) {
		console.error('Spotify API error:', error);
		return json({ isPlaying: false, recentTracks: [] });
	}
};
