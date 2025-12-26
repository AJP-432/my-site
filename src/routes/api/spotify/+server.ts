import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
	SPOTIFY_CLIENT_ID,
	SPOTIFY_CLIENT_SECRET,
	SPOTIFY_REFRESH_TOKEN
} from '$env/static/private';

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';

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

export const GET: RequestHandler = async () => {
	try {
		const tokenResult = await getAccessToken();
		if (!tokenResult) {
			return json({ isPlaying: false });
		}
		const { access_token } = tokenResult;
		const response = await getNowPlaying(access_token);

		if (response.status === 204 || response.status > 400) {
			return json({ isPlaying: false });
		}

		const song = await response.json();

		if (!song.item) {
			return json({ isPlaying: false });
		}

		return json({
			isPlaying: song.is_playing,
			title: song.item.name,
			artist: song.item.artists.map((artist: { name: string }) => artist.name).join(', '),
			album: song.item.album.name,
			albumImageUrl: song.item.album.images[0]?.url,
			songUrl: song.item.external_urls.spotify
		});
	} catch (error) {
		console.error('Spotify API error:', error);
		return json({ isPlaying: false });
	}
};
