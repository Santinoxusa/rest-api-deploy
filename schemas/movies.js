const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie must be a string',
    required_error: 'Title must be included'
  }),
  year: z.number().int().min(1900).max(2027),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  genre: z.array(
    z.enum(['Action', 'Crime', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),
    {
      required_error: 'genre is required',
      invalid_type_error: 'Movie genre must be an array of enum genres'
    }
  )
})

function validateMovie (input) {
  return movieSchema.safeParse(input)
}

function validatePartialMovie (input) {
  return movieSchema.partial().safeParse(input)
}

module.exports = {
  validateMovie,
  validatePartialMovie
}
