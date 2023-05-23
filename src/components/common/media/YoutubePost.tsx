import { YouTubeEmbed } from 'react-social-media-embed'
export default function YoutubePost({ url }: { url: string }) {
   return (
    <YouTubeEmbed height={400} width={400} url={url}/>
  );
}
