//Specify the NodeJS packages needed
const express = require('express');
const app = express();
const cors = require('cors'); //cross-origin resource sharing
const bodyParser = require('body-parser');
const port = 3000;

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite.');
    }
});






//configure app to use bodyParser() and JSON to easily get data from the HTTP body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Allow CORS (i.e. cross-origin requests) for all requests for simplicity
app.use(cors());

//Get an intance of the express router
var router = express.Router();

//Sample Application Data
var urls = [
            'alesund.jpg',
            'bronnoysud.jpg',
            'budapest.jpg',
            'capetown.jpg',
            'cork.jpg',
            'joburghadeda.jpg',
            'oslo.jpg',
            'singapore.jpg'];

//HTTP handler methods
router.get('/thumbnailUrls',function(req, res){
    setTimeout(function(){
        res.status(200).json(urls)
},5000)
return;
})

//FOR LAB 6
var books = [
        {title: 'Millennium', author : 'Stieg Larsson' },
        {title: 'A Christmas Carol', author : 'Charles Dickens'},
        {title: 'The Son', author : 'Jo Nesbo'}
    ]

var films = [
        {name:'Airplane', genre: 'Comedy', blurb: 'Classic plane spoof'},
        {name:'Skyfall',genre: 'Adventure', blurb: 'Bond spy yarn'},
        {name:'Love Actually',genre: 'RomCom', blurb: ' Hugh Grant playing Hugh Grant'}
    ]

//For requests that have the /api prefix, use the router to route the request to the appropriate HTTP handler method above
router.get('/books',function(req, res){
    res.status(200).json(books);
  
});

router.get('/films', function(req,res){
    res.status(200).json(films)
})

router.get('/test',function(req, res){
    res.send('Hello test')
})

router.get('/employees', function(req, res){
    db.all('SELECT * FROM employees',[],(err, rows)=>{
        if(err){
            console.error(err);
            return;
        }
        console.log(rows);
        res.status(200).json(rows)
    })
});


router.get('/employees/:id', function(req, res){
    const id = req.params.id;
    console.log(id)
    db.get('SELECT * FROM employees WHERE id = :id and STATUS = :status',
           {
        ':id': id,
        ':status': 'ACTIVE'
    },
        (err, row) => {

            if (err) {
                console.error(err);
                return res.status(500).json({ error: err.message });
            }

            if (!row) {
                return res.status(404).json({ error: 'Employee not found' });
            }

            res.status(200).json(row);
        })
    
});
router.post('/newcoaching', function(req, res) {
    const payload = req.body;

    db.run(
        `INSERT INTO cp_coachingMain(cm_framework, cm_code)
         VALUES(:framework, 'TEMP')`,
        {
            ':framework': payload.framework
        },
        function(err) {

            if (err) {
                console.error(err);
                return res.status(500).json({
                    error: 'Failed to insert coaching record'
                });
            }

            // This is the actual SQLite auto-increment ID
            const lastInsertID = this.lastID;

            const now = new Date();

            const dateCode =
                String(now.getMonth() + 1).padStart(2, '0') +
                String(now.getFullYear()).slice(-2);

            const coachCoade = `COACH-${dateCode}${lastInsertID}`;

            db.run(
                `UPDATE cp_coachingMain SET
                    cm_code = :cm_code,
                    cm_status = :cm_status,
                    cm_coachtype = :cm_coachtype,
                    cm_framework = :cm_framework,
                    cm_relatedto = :cm_relatedto,
                    cm_coach = :cm_coach,
                    cm_coachee = :cm_coachee,
                    cm_coachingDate = :cm_coachingDate,
                    cm_dateCreated = :cm_dateCreated,
                    cm_dateAcknowledged = :cm_dateAcknowledged,
                    cm_dateSignoff = :cm_dateSignoff,
                    cm_dateClosed = :cm_dateClosed
                 WHERE cm_id = :lastInsertID`,
                {
                    ':cm_code': coachCoade,
                    ':cm_status': 'Pending Coachee Acknowledgement',
                    ':cm_coachtype': payload.sessionType,
                    ':cm_framework': payload.framework,
                    ':cm_relatedto': '',
                    ':cm_coach': payload.coach,
                    ':cm_coachee': payload.coachee,
                    ':cm_coachingDate': payload.coachDate,
                    ':cm_dateCreated': payload.date,
                    ':cm_dateAcknowledged': '',
                    ':cm_dateSignoff': '',
                    ':cm_dateClosed': '',
                    ':lastInsertID': lastInsertID
                },
                function(err) {

                    if (err) {
                        console.error(err);
                        return res.status(500).json({
                            error: 'Failed to update coaching record'
                        });
                    }

                    res.status(201).json({
                        code: coachCoade
                    });
                }
            );
        }
    );
});



app.use('/api',router)
app.listen(port, () => {
    console.log(`Example App listening on port ${port}`);
})