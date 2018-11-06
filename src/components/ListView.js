import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';



const styles = {
    list: {
      width: 250,
    }
  };

  class ListView extends React.Component {
    state = {
      left: false,
      id: ""
    };
  
    toggleDrawer = (side, open) => () => {
      this.setState({
        [side]: open,
      });
    };

    componentWillReceiveProps(props) {
      this.setState({
        left: props.visibility,
        id: props.id
      
      })
    }
  
    render() {  
      const sideList = (
        <div>
            <h1>Restaurant Details</h1>
            
            <Divider />
            {this.props.locations.map((element)=>{
                if(this.state.id === element.id) {
                  return (
                    <div id="selectedCard" key={element.id} className="card" style={{"width":"400px"}}>
                        <img alt={element.id} className="card-img-top card_img" src={element.img}/>
                        <div className="card-body">
                            <h4 className="card-title">{element.name}</h4>
                            <p className="card-text">Category:{element.category}</p>
                            <p className="card-text">Review: {element.review_count}</p>
                            <p className="card-text">Phone:{element.phone}</p>
                            <p className="card-text">Rating:{element.rating}</p>
                            <a href={element.url} className="btn btn-primary">Website</a>
                        </div>
                        <Divider />
                    </div>
                  )
                } else {
                  return (
                    <div id={element.id} key={element.id} className="card" style={{"width":"400px"}}>
                        <img alt={element.id} className="card-img-top card_img" src={element.img}/>
                        <div className="card-body">
                            <h4 className="card-title">{element.name}</h4>
                            <p className="card-text">Category:{element.category}</p>
                            <p className="card-text">Review: {element.review_count}</p>
                            <p className="card-text">Phone:{element.phone}</p>
                            <p className="card-text">Rating:{element.rating}</p>
                            {/* <a href={element.url} className="btn btn-primary">Website</a> */}
                        </div>
                        <Divider />
                    </div>
                )
                }
            })}
        </div>
      );
  
  
      return (
        <div test="test">
          {/* <Button onClick={this.toggleDrawer('left', true)}>Open List View</Button> */}
          <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer('left', false)}
              onKeyDown={this.toggleDrawer('left', false)}
            >
              {sideList}
            </div>
          </Drawer>
        </div>
      );
    }
  }

export default withStyles(styles)(ListView);
