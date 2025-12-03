const AuthorInfo = ({author}: { author: string }) => (
  <div className="flex items-center gap-3">
    <div
      className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border-2 border-blue-200 shadow-lg"
    >
      {true ? (
        <img
          src={"https://t.me/i/userpic/320/KfzxoatT58MtciQSp8yQzP7lsUyHBX8gDzF5ok3nRC8.svg"}
          alt={author}
          className="w-14 h-14 rounded-full object-cover"
        />
      ) : (
        <span className="text-3xl text-blue-600">
          {author || '👤'}
        </span>
      )}
    </div>
    <p className="font-bold text-lg">{author}</p>
  </div>
)

export default AuthorInfo