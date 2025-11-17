const AuthorInfo = ({author}: { author: string }) => (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-gray-500 backdrop-blur-sm flex items-center justify-center text-2xl">
        👤
      </div>
      <p className="font-bold text-lg">{author}</p>
    </div>
)

export default AuthorInfo