const Spinner = () => {
  return (
    <div className='center-inline'>
      <div
        className='animate-spin inline-block size-6 border-3 border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500'
        role='status'
        aria-label='loading'
      >
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  )
}

export default Spinner
