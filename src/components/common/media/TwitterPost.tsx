import { TwitterEmbed } from 'react-social-media-embed'

export default function TwitterPost({ url }: { url: string }) {
 return (
    <TwitterEmbed width={400} height={400} url={url}/>
  );
}
