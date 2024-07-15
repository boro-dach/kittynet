export default function Post({ post }) {
  return (
    <div>
      <h4 className=" text-white">@{post?.username}</h4>
    </div>
  )
}
