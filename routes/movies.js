const express = require('express');
const router = express.Router();

//model
const Movie = require('../models/Movie')

router.post('/', (req, res, next)=> {
  // const {title, imdb, category, country, year, URI} = req.body;
  
  const movie = new Movie(req.body)
 
  const promise = movie.save();
  promise
  .then((data)=>{
    res.json(data)
  })
  .catch((err)=>{
    res.json(err)
  });
});

router.get('/', (req, res) => {
	const promise = Movie.aggregate([
		{
			$lookup: {
				from: 'directors',
				localField: 'director_id',
				foreignField: '_id',
				as: 'director'
			}
		},
		{
			$unwind: '$director'
		}
	]);

	promise.then((data) => {
		res.json(data);
	}).catch((err) => {
		res.json(err);
	})
});


//Top 10 List
router.get('/top10', (req,res)=>{
  const promise = Movie.find({}).limit(10).sort({imdb: -1}); //imdb puanına göre büyükten küçüğe ilk 10 filmi sıraladı
  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  });
});

router.get('/:movie_id', (req, res, next)=> {
  const promise = Movie.findById(req.params.movie_id);
  promise.then((movie)=>{
    if(!movie)
      next({message: 'Movie Not Found'})
    res.json(movie)
  }).catch((err)=>{
    res.json(err)
  })
});
router.put('/:movie_id', (req,res,next)=>{
  const promise= Movie.findByIdAndUpdate(
    req.params.movie_id,
    req.body,
    {
      new: true
    }
  );
  promise.then((movie)=>{
    if(!movie)
      next({message:'Movie is not found'})
    res.json(movie);
  }).catch((err)=>{
    res.json(err);
  });
});
router.delete('/:movie_id', (req,res,next)=>{
  const promise= Movie.findByIdAndRemove(req.params.movie_id);
  promise.then((movie)=>{
    if(!movie)
      next({message:'Movie is not found'})
    res.json({status: 1});
  }).catch((err)=>{
    res.json(err);
  });
});

router.get('/between/:start_year/:end_year', (req,res)=>{ //belirlenen yıllar arasındaki filmleri çekmek için
  const {start_year, end_year} = req.params; //requestten gelen parametreleri alıyoruz
  const promise = Movie.find(
    {
      year: {                           //veritabanındaki objenin neresinde arama yapacaksak belirleriz. burada year kullanıldı.
        "$gte": parseInt(start_year),   //$gte büyük eşit anlamına geliyor ve gelen string değeri parseInt ile integer değere çevirdik
        "$lte": parseInt(end_year)      //$lte küçük eşit anlamına gelir 
      }                                 //$gt büyük, $lt küçük anlamına gelir. e harfi ise eşitlik verir
    }
    );

  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  });
});

module.exports = router;