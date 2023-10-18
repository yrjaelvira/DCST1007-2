import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { pool } from './mysql-pool';
import { Card, Row, Column, Button, Form, NavBar } from './widgets';
import { NavLink, HashRouter, Route } from 'react-router-dom';

class Chatroom {
    id: number = 0;
    title: string = "";
    description: string = "";
}

class Message {
    id: number = 0;
    text: string = "";
    chatroomId: number = 0;
}

class ChatroomService {
    getChatrooms(success: (chatRooms: Chatroom[]) => void){
        pool.query('SELECT * FROM ChatRooms', (error: any, results: any) => {
            if (error) return console.error(error);
      
            success(results);
        });
    }

    getChatroom(id: number, success: (chatRooms: Chatroom[])=> void){
        pool.query('SELECT * FROM ChatRooms WHERE id=?', [id], (error: any, results: any) => {
            if(error) return console.error(error);

            success(results[0]);
        });
    }

    addChatroomMessage(chatRoomId: number, text: string, success: () => void){
        pool.query('INSERT INTO Messages (text, chatRoomId) VALUES (?, ?)', [text, chatRoomId], (error: any, results: any) => {
            if(error) return console.error(error);

            success();
        });
    }

    getChatroomMessages(chatRoomId: number, success: (messages: Message[])=> void){
        pool.query('SELECT * FROM Messages WHERE chatRoomId =?', [chatRoomId], (error: any, results: any) => {
            if(error) return console.error(error);

            success(results);
        });
    }

    addChatroom(chatRoom: Chatroom, success: () => void){
        pool.query('INSERT INTO Chatrooms (title, description) VALUES (?, ?)', [chatRoom.title, chatRoom.description], (error: any, results: any) => {
            if(error) return console.error(error);

            success();
        });
    }
}

export let chatroomService = new ChatroomService();
const history = createHashHistory(); 


class Menu extends Component{
    render(){
        return <NavBar brand="ChatNav">
            <NavBar.Link exact to="/" activeStyle={{ color: 'darkblue' }}>
                ChatAdm
            </NavBar.Link>{' '}
            <NavBar.Link to="/chats" activeStyle={{ color: 'darkblue' }}>
                Chats
            </NavBar.Link>
        </NavBar>
    }
}

class ChatRooms extends Component{
    chatRooms: Chatroom[] = [];
    newChatRoom = new Chatroom();
  
    render() {
      return (
        <div>
          <Card title="Chat rooms">
            {this.chatRooms.map((chatRoom) => (
              <Row key={chatRoom.id}>
                <Column>
                  <NavLink to={'/chatRoom/' + chatRoom.id}>{chatRoom.title}</NavLink>
                </Column>
              </Row>
            ))}
          </Card>
          <Card title="New chat room">
            <Form.Label>Title</Form.Label>
            <Form.Input
              type="text"
              value={this.newChatRoom.title}
              onChange={(event: { currentTarget: { value: any; }; }) => (this.newChatRoom.title = event.currentTarget.value)}
            />
            <Form.Label>Description</Form.Label>
            <Form.TextArea
              value={this.newChatRoom.description}
              onChange={(event: { currentTarget: { value: any; }; }) => (this.newChatRoom.description = event.currentTarget.value)}
            />
            <Button.Success
              onClick={() =>
                chatroomService.addChatroom(this.newChatRoom, () => {
                  this.newChatRoom = new Chatroom();
                  this.mounted();
                })
              }
            >
              Create chat room
            </Button.Success>
          </Card>
        </div>
      );
    }
  
    mounted() {
      chatroomService.getChatrooms((chatRooms) => (this.chatRooms = chatRooms));
    }
} 

class ChatRoomDetails extends Component<{ match: { params: { id: string } } }>{
    chatRoom = new Chatroom();
    messages: Message[] = [];
    newMessage = new Message();
    props: any;

    render() {
        return (
            <div>
                <Card title="Chat room">
                    <Card title={this.chatRoom.title}>
                        {this.chatRoom.description}
                        <Card title="Messages">
                            {this.messages.map((message) => (
                                <Row key={message.id}>
                                    <Column>{'> ' + message.text}</Column>
                                </Row>
                            ))}
                        </Card>
                    </Card>
                    <Card title="New message">
                        <Form.TextArea
                            value={this.newMessage.text}
                            onChange={(event: { currentTarget: { value: string; }; }) => (this.newMessage.text = event.currentTarget.value)}
                        />
                        <Button.Success
                            onClick={() =>
                                chatroomService.addChatroomMessage(
                                Number(this.props.match.params.id),
                                    this.newMessage.text,() => {
                                        this.newMessage = new Message();
                                        this.mounted();
                                    }
                                )
                            }
                        >
                            Create message
                        </Button.Success>
                    </Card>
                </Card>
            </div>
        );
    }

    mounted() {
        chatroomService.getChatroom(
            Number(this.props.match.params.id),
            (chatRoom) => (this.chatRoom = chatRoom)
        );
        chatroomService.getChatroomMessages(
            Number(this.props.match.params.id),
            (messages) => (this.messages = messages)
        );
    }
}

ReactDOM.render(
    <HashRouter>
      <Menu />
      <Route exact path="/" component={ChatRooms} />
      <Route exact path="/chatRoom/:id" component={ChatRoomDetails} />
    </HashRouter>,
    document.getElementById('root')
  );