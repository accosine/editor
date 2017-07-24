import React, { Component } from 'react';
import { DragDropContext, DragDropContextProvider } from 'react-dnd';
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';
import TargetBox from './TargetBox';
import FileList from './FileList';
import Button from 'material-ui/Button';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('Dnd', theme => ({
  button: {
    margin: '10em',
  },
}));

class Dnd extends Component {
  constructor(props) {
    super(props);

    props.CONNECT('images', props.DATABASE, props.REFS, props.ACTIONS);

    this.state = {
      droppedFiles: [],
      upload: 0,
      images: '',
    };
  }

  componentDidMount() {
    // Add database change listener for each reference in the refs object
    console.log(this.props);
    this.props.REFS['images'].on('value', snapshot => {
      this.setState({ images: snapshot.val() });
    });
  }

  componentWillUnmount() {
    // Remove all database change listeners
    this.props.REFS['images'].off();
  }

  uploadFiles = files => {
    const timestamp = Date.now();
    const incrementUpload = () =>
      this.setState({ upload: this.state.upload + 1 });
    const switchTabIfReady = (tabnumber, arrlength) => {
      if (this.state.upload == arrlength) {
        this.props.switchTab(null, tabnumber);
      }
    };
    const writeNewImage = (name, caption, alt, attribution) => {
      // A new image
      var imageData = {
        name,
        attribution,
        caption,
        alt,
      };

      // Get a key for a new image
      var newImageKey = this.props.REFS['images'].push().key;

      var updates = {};
      updates['/images/' + newImageKey] = imageData;

      return this.props.DATABASE.ref().update(updates);
    };
    const fileext = (type) => {
      let extension
      switch(type) {
        case "image/jpeg":
          extension = ".jpg";
          break;
        case "image/gif":
          extension = ".gif";
          break;
        case "image/png":
          extension = ".png";
          break;
      }
      return extension
    };
    // TODO: conveniece function which adds file extension
    // TODO: write file name and file tags to firebase
    const storageRef = this.props.STORAGE.ref();
    const uploadTasks = files.map(file =>
      storageRef
        .child(`${file.newname}` + timestamp + fileext(file.type))
        .put(file)
        .then(function(snapshot) {
          incrementUpload();
          switchTabIfReady(1, files.length);
          writeNewImage(
            file.newname + timestamp + fileext(file.type),
            file.newattribution,
            file.newcaption,
            file.newalttext
          );
          console.log(snapshot);
          console.log('Uploaded an image!');
        })
        .catch(console.log)
    );
  };

  handleFileDrop = (item, monitor) => {
    if (monitor) {
      const droppedFiles = monitor.getItem().files;
      this.setState({ droppedFiles });
    }
  };

  render() {
    const { FILE } = NativeTypes;
    const { droppedFiles } = this.state;
    const { classes } = this.props;

    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div>
          <TargetBox accepts={[FILE]} onDrop={this.handleFileDrop} />
          <FileList files={droppedFiles} />
          <Button
            onClick={() => this.uploadFiles(droppedFiles)}
            fab
            color="accent"
            className={classes.button}
          >
            <ModeEditIcon />
          </Button>
        </div>
      </DragDropContextProvider>
    );
  }
}
export default withStyles(styleSheet)(DragDropContext(HTML5Backend)(Dnd));
