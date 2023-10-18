import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { Scores, gameService } from './services';
import { Alert, Card, Row, Column, Button, Form, NavBar } from './widgets';

//pengeoversikt familiespill

class Spill extends Component{
  scores: Scores[] = [];

    render(){
        return(
          <Card>
              <Row>
                 <Column width={2}>
                      <h4>Spiller</h4>
                 </Column> 
                 <Column width={2}>
                      <h4>Poeng</h4>
                 </Column> 
                 <Column width={1}>
                 </Column> 
              </Row>

              {this.scores.map((spiller) => {
                 return <Row key={spiller.id}>
                      <Column width={2}>
                          {spiller.name}
                      </Column>
                      <Column width={2}>
                          {spiller.score}
                      </Column>
                      <Column width={2}>
                          <Button.Light onClick={() => this.addPoint(spiller.score, spiller.id)}>
                              +
                          </Button.Light>
                      </Column>
                  </Row>
              })}

              <Row>
                <Column width={2}>
                <Button.Danger onClick={() => this.resetScore()}>Nullstill</Button.Danger>
                </Column>
              </Row>
          </Card>
        )
    }

  mounted(): void {
      gameService.getPlayers((scores) => {
        this.scores = scores;
      })
  }

  addPoint(score: number, id: number){
    gameService.addPoint(score +1, id);
    this.mounted();
  }

  resetScore(){
    gameService.resetGame();
    this.mounted();
  }
}


let root = document.getElementById('root');
if (root) 
    createRoot(root).render(
        <div>
            <Alert />
            <HashRouter>
              <Spill />
            </HashRouter>
        </div>
    )


//services-fil
import { pool } from './mysql-pool';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';


export class Scores {
  id!: number;
  name: string | undefined;
  score!: number;
}

class GameService {

  getPlayers(success: (scores: Scores[]) => void){
    pool.query(
      'SELECT * FROM scores', (error:Error, results: any) => {
        if(error) return console.error(error);

        success(results);
      }
    )
  }

  addPoint(score: number, id: number){
    pool.query(
      'UPDATE scores SET score = ? WHERE id=?', [score, id], (error: any, results: RowDataPacket []) => {
        if(error) return console.error(error);

        return results;
      }
    )
  }

  resetGame(){
    pool.query(
      'UPDATE scores SET score = 0', (error: Error, results: any) => {
        if(error) return console.error(error);

        return results; 
      }
    )
  }
}

export let gameService = new GameService();