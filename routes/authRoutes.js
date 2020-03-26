const passport = require('passport');

module.exports = (app) => {

    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/dashboard/weekly')
        }
    );

    app.get('/api/current_user', (req, res) => {
        if(req.user !== undefined){
            res.send(req.user) 
        }
    })

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/')
    })
}