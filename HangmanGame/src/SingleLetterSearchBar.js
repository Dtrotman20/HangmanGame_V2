
import React from 'react';
class SingleLetterSearchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

    handleInputChange = (event) => {
        const value = event.target.value.charAt(0); // Get only the first character
        this.setState({
            inputValue: value}
        );
    };

    handleSearchClick = () => {
        if (this.state.inputValue.length === 1) {
            this.props.onSearch(this.state.inputValue);
        } else {
            alert('Please enter a single letter.');
        }
        // Clear input after search
        this.setState({
            inputValue: ''
        });
    };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          maxLength={1}
        />
        <button onClick={this.handleSearchClick}>Search</button>
      </div>
    );
  }
}

export default SingleLetterSearchbar;



