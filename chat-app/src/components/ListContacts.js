import React, { Component } from 'react';
import './components.css'
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';


class ListContacts extends Component {

constructor(props){
  super(props);
  this.state = {
    query : ""
  }
}

  updateQuery = (query) => {
    this.setState((prevState) => ({
      query: query.trim()
    }))
  }

  clearQuery = () =>{
    this.setState({
      query: ""
    })
  }

  render() {

    const {query } = this.state;
    const {contacts, onDelete} = this.props;

    let showingContacts;
    if(query){
      const match = new RegExp(escapeRegExp(query), 'i')
      showingContacts = contacts.filter((contact)=>match.test(contact.name))
    }else{
      showingContacts = contacts
    }

    return (
      <div >
         <input className="input-search" type="text" placeholder="Search for contacts"
          onChange={(event) => this.updateQuery(event.target.value)} value={query}
         />
         
         
         {showingContacts.length !== contacts.length && (
           <div>
             <span>Now showing {showingContacts.length} of {contacts.length}</span>
             <button onClick={()=> this.clearQuery()}>total</button>
           </div>
         )}


      <ol  className="contact-list">
        {showingContacts.map((contact)=>(
           
            <li key={contact.id} className="contact-list-item">

             
              <div className="contact-list">
               <div className="contact-avatar" style={{backgroundImage: `url(${contact.avatarURL})`}}/>
              <div className="list-details">
                 <p className="list-name">{contact.name}</p>
                 <p className="list-email">{contact.email}</p>
               </div>
             
               
 
               </div>
               <div className="closeBtn">
                 <button onClick={() => onDelete(contact)}>X</button>
               </div>
               
            </li>
           
          ))}
      </ol>
       
      </div>
    );
  }
}

export default ListContacts;
