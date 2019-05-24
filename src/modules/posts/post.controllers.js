import HTTPStatus from 'http-status';

import Post from './post.model'

export async function posts(req, res) {

  const { make, type, country, price_start, price_end } = req.body.data
  try {
    const posts = await Post.find({
      make,
      type,
      country,
      price_start: { $gte: price_start, $lte: price_end }
    })
    res.status(HTTPStatus.OK).json(posts)
  } catch (e) {
    res.status(HTTPStatus.BAD_REQUEST).json(e)
  }
}

export async function createPost(req, res) {
  try {
    const post = await Post.create(req.body)
    res.status(HTTPStatus.CREATED).json(post)
  } catch (e) {
    res.status(HTTPStatus.BAD_REQUEST).json(e)
  }
}
