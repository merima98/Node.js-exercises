exports.get404 = (req, res) => {
  res.status(404).render('404', {
    pageTitle: 'Page Not Found', path: 'Error',
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.get500 = (req, res) => {
  res.status(500).render('500', {
    pageTitle: 'Error!', path: '/500',
    isAuthenticated: req.session.isLoggedIn
  });
};