const BlogForm = ({
    onSubmit,
    handleAuthorChange,
    handleTitleChange,
    handleUrlChange,
    author,
    title,
    url
}

) => {

    return (
        <div>
            <form onSubmit={onSubmit}>
            <div>
                title: 
                <input
                type="text"
                value={title}
                onChange={handleAuthorChange}
                />
            </div>
            <div>
                author: 
                <input
                type="text"
                value={author}
                onChange={handleTitleChange}
                />
            </div>
            <div>
                url: 
                <input
                type="text"
                value={url}
                onChange={handleUrlChange}
                />
            </div>
            <button type="submit">create</button>
            </form>
        </div>
    )
}
export default BlogForm