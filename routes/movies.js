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


//IMDB sıralı liste

router.get('/imdb', (req,res)=>{
  const promise = Movie.find({}).sort({imdb: -1}); //imdb puanına göre büyükten küçüğe ilk 10 filmi sıraladı
  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  });
});


//Gizem Kategorisine Ait Liste

router.get('/gizem', (req,res)=> {
  const promise = Movie.find({ $or: [ { category: "Gizem" }, { category2: 'Gizem' } ] } );
  promise.then((data)=> {
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  });
});

//Biyografi Kategorisine Ait Liste

router.get('/biyografi', (req,res)=> {
  const promise = Movie.find({ $or: [ { category: "Biyografi" }, { category2: 'Biyografi' } ] } );
  promise.then((data)=> {
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  });
});

//Dram Kategorisine Ait Liste

router.get('/dram', (req,res)=> {
  const promise = Movie.find({ $or: [ { category: "Dram" }, { category2: 'Dram' } ] } );
  promise.then((data)=> {
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  });
});

// Suç Kategorisine Ait Liste

router.get('/suc', (req,res)=> {
  const promise = Movie.find({ $or: [ { category: "Suç" }, { category2: 'Suç' } ] } );
  promise.then((data)=> {
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  });
});

//Savaş Kategorisine Ait Liste

router.get('/savas', (req,res)=> {
  const promise = Movie.find({ $or: [ { category: "Savaş" }, { category2: 'Savaş' } ] } );
  promise.then((data)=> {
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  });
});

//Komedi Kategorisine Ait Liste

router.get('/komedi', (req,res)=> {
  const promise = Movie.find({ $or: [ { category: "Komedi" }, { category2: 'Komedi' } ] } );
  promise.then((data)=> {
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  });
});

//Aksiyon Kategorisine Ait Liste

router.get('/aksiyon', (req,res)=> {
  const promise = Movie.find({ $or: [ { category: "Aksiyon" }, { category2: 'Aksiyon' } ] } );
  promise.then((data)=> {
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  });
});

//Gerilim Kategorisine Ait Liste

router.get('/gerilim', (req,res)=> {
  const promise = Movie.find({ $or: [ { category: "Gerilim" }, { category2: 'Gerilim' } ] } );
  promise.then((data)=> {
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  });
});

//Animasyon Kategorisine Ait Liste

router.get('/animasyon', (req,res)=> {
  const promise = Movie.find({ $or: [ { category: "Animasyon" }, { category2: 'Animasyon' } ] } );
  promise.then((data)=> {
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  });
});

//Macera Kategorisine Ait Liste

router.get('/macera', (req,res)=> {
  const promise = Movie.find({ $or: [ { category: "Macera" }, { category2: 'Macera' } ] } );
  promise.then((data)=> {
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  });
});

//Aile Kategorisine Ait Liste

router.get('/aile', (req,res)=> {
  const promise = Movie.find({ $or: [ { category: "Aile" }, { category2: 'Aile' } ] } );
  promise.then((data)=> {
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  });
});

//Korku Kategorisine Ait Liste

router.get('/korku', (req,res)=> {
  const promise = Movie.find({ $or: [ { category: "Korku" }, { category2: 'Korku' } ] } );
  promise.then((data)=> {
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  });
});

//Bilimkurgu Kategorisine Ait Liste

router.get('/bilimkurgu', (req,res)=> {
  const promise = Movie.find({ $or: [ { category: "Bilimkurgu" }, { category2: 'Bilimkurgu' } ] } );
  promise.then((data)=> {
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  });
});

//Romantik Kategorisine Ait Liste

router.get('/romantik', (req,res)=> {
  const promise = Movie.find({ $or: [ { category: "Romantik" }, { category2: 'Romantik' } ] } );
  promise.then((data)=> {
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  });
});
//Fantastik Kategorisine Ait Liste

router.get('/fantastik', (req,res)=> {
  const promise = Movie.find({ $or: [ { category: "Fantastik" }, { category2: 'Fantastik' } ] } );
  promise.then((data)=> {
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