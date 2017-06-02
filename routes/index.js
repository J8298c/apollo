module.exports = (app, Workout) =>{
        
  app.get('/', (req, res)=>{
    res.render('index', {title: 'Apollo'});
  });

  app.get('/all', (req, res, next)=>{
      res.render('allworkouts', {name: 'Starlord'})//hardcoded value for now
  });

  app.get('/workout/:name', (req, res, next)=>{
      //hardcoded values for MVP
      res.render('workout', 
      {
          name: req.params.name,
          workout:[{
            name: 'jog',
            set: '10 mins',
            reps: 1
            },{
            name: 'pullups',
            set: 3,
            reps: 3
            },{
            name: 'pushups',
            set: 3,
            reps: 10
            },{
            name: 'squats',
            set: 3,
            reps: 10
            },{
            name: 'lat pull-down',
            set: 5,
            reps: 10
            },{
            name: 'dumbbell-rows',
            set: 5,
            reps: 10
            },{
            name: 'barbell-curls',
            set: 5,
            reps: 10
            },{
            name: 'curls',
            set: 5,
            reps: 10
            }]
      })
  });

  app.get('/create', (req, res, next)=>{
      res.render('createworkout')
  })
  app.post('/create', (req, res, next)=>{
      const workout = new Workout({
          name: req.body.name,
          reps: req.body.reps,
          sets: req.body.sets
      });
      console.log('the workout', workout);
  })
}