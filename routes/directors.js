const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Director = require('../models/Director');

router.post('/', (req, res, next)=> {
  const director = new Director(req.body);
  const promise = director.save();
  promise.then((data)=>{
      res.json(data)
  }).catch((err)=>{
      res.json(err)
  });
});
router.get('/directors',(req,res)=> {
    const promise = Director.find({});
    promise.then((data)=>{
        res.json(data);
    }).catch((err)=> {
        res.json(err)
    });
});
router.get('/', (req,res)=>{
    const promise = Director.aggregate([
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'filmleri'
            }
        },
        {
            $unwind: {
                path: '$filmleri',
                         //herhangi bir filmle eşleşmesi olmayan yönetmenleri görüntülemek için bu parametre girilir.
            }
        },
        {
            $group: {           //aynı yönetmene ait filmleri tek array içinde toplamak için gruplandırma yaptık
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$filmleri',
                    preserveNullAndEmptyArrays: true
                }
            }
        },
        {
            $project: {         //en başta kapsayan _id isimli objeyi kaldırmak için project kullandık
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies'
            }
        }
    ]);
    promise.then((data)=>{
        res.json(data)
    }).catch((err)=>{
        res.json(err)
    });
});
router.get('/:director_id', (req,res)=>{
    const promise = Director.aggregate([
        {
            $match: {           //sadece belli bir id ile arama yapmak isteyince match operatörü kullanılır.
                '_id':mongoose.Types.ObjectId (req.params.director_id)       //hangi alanda arama yapacaksak o belirlenir ve req ile gelen director_id parametresine tanımlanır.
            }                       // buradan gelen id object id olduğu için mongoose sayfaya dahil edilit ve parametrenin önne mongoose.types.objectid tanımlaması yapılır 
        },
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'filmleri'
            }
        },
        {
            $unwind: {
                path: '$filmleri',
                preserveNullAndEmptyArrays: true //herhangi bir filmle eşleşmesi olmayan yönetmenleri görüntülemek için bu parametre girilir.
            }
        },
        {
            $group: {           //aynı yönetmene ait filmleri tek array içinde toplamak için gruplandırma yaptık
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$filmleri'
                }
            }
        },
        {
            $project: {         //en başta kapsayan _id isimli objeyi kaldırmak için project kullandık
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies'
            }
        }
    ]);
    promise.then((data)=>{
        res.json(data[0])
    }).catch((err)=>{
        res.json(err)
    });
});

router.put('/:director_id', (req,res,next)=>{
    const promise= Director.findByIdAndUpdate(
      req.params.director_id,
      req.body,
      {
        new: true
      }
    );
    promise.then((director)=>{
      if(!director)
        next({message:'Director is not found'})
      res.json(director);
    }).catch((err)=>{
      res.json(err);
    });
  });

  router.delete('/:director_id', (req,res,next)=>{
      const promise = Director.findByIdAndRemove(req.params.director_id);
      promise.then((director)=> {
        if(!director)
          next({message:'Director Not Found'});
        res.json({status: 'Yönetmen Silindi'})
      }).catch((err)=>{
          res.json(err)
      })
  });
module.exports = router;
