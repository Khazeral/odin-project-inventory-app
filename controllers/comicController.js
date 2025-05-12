const pool = require("./pool");

exports.getAllComics = asyncHandler(async (req, res, next) => {
    const comics = await pool.query("SELECT * FROM comic")

    res.render('./comics/comics_list', {
        title: 'Liste de comics',
        comics: comics,
    });
});

exports.getComicById = asyncHandler(async(req, res, next) => {
    console.log(req.body)
    const comic = await pool.query(`SELECT * FROM comic WHERE id=${req.body.id}`)

    res.render('./comics/comic_detail', {comic: comic})
})