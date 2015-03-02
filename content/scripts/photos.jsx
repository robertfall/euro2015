function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

var If = React.createClass({
    render: function() {
        if (this.props.test) {
            return this.props.children;
        }
        else {
            return false;
        }
    }
});

var Thumb = React.createClass({
  style: function() {
    return {
      backgroundImage: 'url(/images/' + this.props.country + '/thumbs/' + this.props.photo + ')'
    };
  },
  handleClick: function() {
    this.props.onClick(this.props.country, this.props.photo);
  },
  render: function() {
    return (
      <a className='picture' style={this.style()} onClick={this.handleClick}/>
    );
  }
});

var Preview = React.createClass({
  render: function() {
    return (
      <div>
        <img src={this.props.url} />
        <a className='download-link' href={this.props.url}>Right click here and click save as to download this photo</a>
      </div>
    );
  }
});

var Gallery = React.createClass({
  getInitialState: function() {
    return {}

  },
  handleClick: function(country, photo) {
    var photoUrl = '/images/' + country + '/' + photo;
    this.setState({selectedPhoto: photoUrl});
  },

  render: function() {
    var headerClass = 'gallery-header ' + this.props.country.class;
    return (
      <div>
        <div className='gallery'>
          <div className={headerClass}>
            {this.props.country.name}
          </div>
          <If test={this.state.selectedPhoto}>
              <Preview url={this.state.selectedPhoto} />
          </If>
          {this.props.country.thumbs.map(function(thumb) {
            return <Thumb country={this.props.country.code} photo={thumb} onClick={this.handleClick} />;
          }, this)}
        </div>
      </div>
    );
  }
});

var Photos = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.countries.map(function(country) {
          return <Gallery country={country} />;
        })}
      </div>
    );
  }
})

