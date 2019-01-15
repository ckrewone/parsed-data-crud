import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as bodyParserXml from 'express-xml-bodyparser';

class Main {

    private app: express.Application;

    constructor() {
        this.app = express();
    }

    public async run() {
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.text());
        this.app.use(bodyParser.raw());
        this.app.use(bodyParserXml({trim: true}));

        this.app.post('/object', (req: express.Request, res: express.Response, next: express.NextFunction) => {
            console.log(req.body);
        });
        this.app.listen(3000, (err: any) => {
            if (err) console.log(err);
            else console.log('Server is running at 3000');
        })
    }


}

new Main().run();
