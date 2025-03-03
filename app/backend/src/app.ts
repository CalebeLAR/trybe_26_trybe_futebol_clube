import * as express from 'express';
import 'express-async-errors';
import teamRouter from './routes/teams.router';
import userRouter from './routes/user.router';
import matchRouter from './routes/match.router';
import leaderboardRouter from './routes/leaderboard.router';
import ErrorMiddleware from './middlewares/errorMiddleware';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.routes();
    this.app.use(ErrorMiddleware.handlerError);
  }

  private routes(): void {
    this.app.use(teamRouter);
    this.app.use(userRouter);
    this.app.use(matchRouter);
    this.app.use(leaderboardRouter);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
