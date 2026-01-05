export interface SpotifyTrack {
	title: string;
	artist: string;
	album: string;
	albumImageUrl: string;
	songUrl: string;
}

export interface SpotifyData {
	isPlaying: boolean;
	currentTrack: SpotifyTrack | null;
	recentTracks: SpotifyTrack[];
}
