const AnswerController = require('../controllers/answer.controller')


module.exports = app => {

    app.post('/api/answer', AnswerController.createNewAnswer);

    app.get('/api/answers', AnswerController.findAllAnswers);

    app.get('/api/answer/:id', AnswerController.findOneAnswer);

    app.delete('/api/answer/:id', AnswerController.deleteOneAnswer);
    
}