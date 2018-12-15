import React, {PureComponent} from 'react';
import List from 'Com/List';
import styles from './Home.css';

class Home extends PureComponent {
  state = {
    val: 0,
    arr: [1, 2, 3]
  };

  render() {
    return (
      <div className={styles.home}>
        Home4
        <List arr={this.state.arr}/>
      </div>
    );
  }
}

export default Home;