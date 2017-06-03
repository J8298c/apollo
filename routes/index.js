module.exports = (app, Workout) =>{
        
  app.get('/', (req, res)=>{
    res.render('index', {title: 'Apollo'});
  });

  app.get('/all', (req, res, next)=>{
      Workout.find({})
      .exec((err, workouts)=>{
          if(err){
              console.log(err);
          } else {
          console.log(workouts, 'workouts in the DB');
        res.render('allworkouts', {workouts: workouts})
          }
      })
  });

//create workout routes
  app.get('/create', (req, res, next)=>{
      res.render('createworkout')
  })
  app.post('/create', (req, res, next)=>{
      const workout = new Workout({
          name: req.body.name,
          reps: req.body.reps,
          sets: req.body.sets
      });
      workout.save(err=>{
          if(err){
              console.log(err);
          } else {
            Workout.find({})
             .exec((err, workouts)=>{
          if(err){
              console.log(err);
          } else {
          console.log(workouts, 'workouts in the DB');
        res.render('allworkouts', {workouts: workouts})
          }
      })
          }
      })
      console.log('the workout', workout);
  });

//edit workout routes
    app.get('/workout/:name', (req, res, next)=>{
      Workout.findOne({name: req.params.name}, (err, workout)=>{
          if(err){
              console.log(err);
          } else {
              res.render('workout', {name: workout.name, reps: workout.reps, sets: workout.sets})
          }
      })
  });

}