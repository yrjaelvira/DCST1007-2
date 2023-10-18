import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { NavLink, Hashrouter, Route } from 'react-router-dom';
import { Show, ShowRating, ShowService } from './services';
import { Alert, Card, Row, Column, NavBar, Button, Form } from './widgets';
import { createHashHistory } from 'history';

export class Show {
    id: number;
    title: string;
    description: string;
}

export class ShowRating {
    id: number;
    rating: number;
    showId: number; 
}

class ShowService {

    getShows(success: (shows: Show[]) => void){
        pool.query(
        'SELECT * FROM Shows ', (error: any, results: any) => {
            if (error) return console.error(error);

            success(results);
        });
    }

    getShowsByTitle(id: number, success: (show: Show) => void){
        pool.query(
            'SELECT * FROM Shows WHERE id=?', [id], (error: any, results: any) => {
            if (error) return console.error(error);

            success(results[0])
        });
    }

    addNewShow(show: Show, success: () => void){
        pool.query(
        'INSERT INTO Shows (title, description) VALUES(?,?)', [show.title, show.description], (error: any, results: any) => {
            if (error) return console.error(error);

            success();
        });
    }

    getRatings(id: number, success: (rating: ShowRating) => void){
        pool.query(
        'SELECT rating FROM ShowRating sr INNER JOIN Show s ON sr.showId=s.id WHERE id=?', [id], (error: any, results: any) => {
            if (error) return console.error(error);

            success(results[0]);
        });
    }

    addNewRating(showRating: ShowRating, success: () => void){
        pool.query(
        'INSERT INTO ShowRating (rating, showId) VALUES(?,?)', [showRating.rating, showRating.showId], (error: any, results: any) => {
            if (error) return console.error(error);

            success();
        });
    }
    
}

export let showService = new ShowService();


const history = createHashHistory();

class Menu extends Component {
    render() {
        return (
            <div>
                <NavBar>
                    <NavLink exact to ="/" activeStyle={{ color: 'darkblue' }}>Shows</NavLink>{ ' ' }
                    <NavLink exact to ="/newShow" activeStyle={{ color: 'darkblue' }}>New show</NavLink>{ ' ' }
                    <NavLink exact to ="/ratings/:id" activeStyle={{ color: 'darkblue' }}>New rating</NavLink>{ ' ' }
                </NavBar>
            </div>
        )
    }
}

class Home extends Component {
    searchInput: string = '';
    shows: Show[] = [];

    render(){
        return(
            <div>
                <h1>List of all shows: </h1>

                <Row>
                   <Card title='BarneTV-programmer'>
                    <Form.Input
                        type='text';
                        value={this.searchInput}
                        onChange={(e) => this.searchInput = e.target.value}
                        required={true}
                        placeholder='Search'
                    />
                    <Button.Success
                        onClick={this.search}
                    >
                        Search
                    </Button.Success>
                    <Button.Light
                        onClick={this.reset}
                    >
                        Reset
                    </Button.Light>
                    </Card> 

                    {
                        this.shows?.map((show, index) => {
                            return <ShowCard key={index} show={show} />
                        })
                    }

                    <Button.Light
                        onClick={() => history.push("/newShow")}
                    >
                        New show
                    </Button.Light>
                </Row>
            </div>
        );
    }

    mounted(){
        showService.getShows() => {
            this.shows = shows;
        }
    }

    search(){
        showService.getShowsByTitle(this.searchInput) => {
            this.show = show;
        }
    }

    reset(){
        showService.getShows() => {
            this.shows = shows;
        }
    }
}

class ShowCard extends Component {
    props: any;
    rating: number = 0;
    show = new Show();

    render(){
        return(
            <Card title={this.props.show.title}>
                <Row>{this.props.show.description}</Row>
                <Row>Gjennomsnittlig terningkast: {this.rating.toFixed(2)}</Row>
                <Navlink to={`/rating/${this.props.show.id}`}>
                    Rate the show
                </Navlink>
            </Card>
        );
    }

    mounted(){
        this.props.show.rating = showService.getRatings(this.props.show.id);
        this.rating = this.props.show.ratings?(this.props.show.ratings?.reduce((a,b) => a + b, 0) / this.props.show.ratings?.length) : 0;
    }
}

class NewShow extends Component {
    show = new Show();

    render(){
        return(
            <Card>
                <Row>
                    <Form.Label>
                        Title
                    </Form.Label>
                    <Form.Input
                        type='text'
                        value={this.show.title}
                        onChange={(e) => this.show.title = e.target.value}
                    />
                </Row>

                <Row>
                    <Form.Label>
                        Description
                    </Form.Label>
                    <Form.Input 
                        type='text'
                        value={this.show.description}
                        onChange={(e) => this.show.description = e.target.value}
                    />
                </Row>
               <br />

               <Button.Success
                    onClick={() => this.add()}
                >
                    Save
               </Button.Success>

               <Button.Danger
                    onClick={() => history.push('/')}
                >
                    Cancel
               </Button.Danger>
            </Card>
        )
    }

    add(){
        showService.addNewShow(this.show);
        history.push('/');
    }
}

class NewRating extends Component {
    rating: number = 0;

    render() {
        return(
            <Card title="New rating">
                <Row>
                    <Form.Label>
                        Rating
                    </Form.Label>
                    <Form.Input
                        type='text'
                        value={this.rating}
                        onChange={(e) => this.rating = Number(e.target.value)}
                    />
                </Row>

                <br />

                <Button.Success
                    onClick={() => this.add()}
                >
                    Save
               </Button.Success>

               <Button.Danger
                    onClick={() => history.push('/')}
                >
                    Cancel
               </Button.Danger>
            </Card>
        );
    }

    add() {
        if (this.rating < 1 || this.rating > 6) return;

        showService.addNewRating(this.rating, Number(this.props.match.params.id));
        history.push('/');
    }
}


let root = document.getElementById('root');
if (root) 
    createRoot(root).render(
        <div>
            <Alert />
            <HashRouter>
                <div>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/newshow" component={NewShow} />
                    <Route exact path="/rating/:id" component={NewRating} />
                </div>
            </HashRouter>
        </div>
    )
