import React, { Component } from "react";
import {
  IonModal,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonLabel,
  IonTextarea,
  IonGrid,
  IonRow,
  IonCol,
  IonFooter,
  IonDatetime
} from "@ionic/react";

class AddItemModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // see - https://reactjs.org/docs/uncontrolled-components.html
    this.subject = React.createRef();
    this.body = React.createRef();
    this.dueDate = React.createRef();
  }

  render() {
    return (
      <IonModal
        isOpen={this.props.showModal}
        onDidDismiss={() => this.props.onDidDismiss()}
      >
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Add Item</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent padding>
          <p>This is modal content</p>
          <IonItem>
            <IonLabel position="stacked">Subject</IonLabel>
            <IonInput type="text" ref={this.subject} name="subject" />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Due Date</IonLabel>
            <IonDatetime
              display-format="MMM DD, YYYY"
              ref={this.dueDate}
              name="body"
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Summary</IonLabel>
            <IonTextarea rows={6} ref={this.body} name="body" />
          </IonItem>
        </IonContent>
        <IonFooter>
          <IonToolbar>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonButton
                    expand="full"
                    onClick={() => {
                      debugger;
                      let ret = {
                        dueDate: this.dueDate.current.value,
                        body: this.body.current.value,
                        subject: this.subject.current.value
                      };
                      this.props.onDidDismiss({ ret });
                      this.dueDate.current.value = null;
                      this.body.current.value = null;
                      this.subject.current.value = null;
                    }}
                  >
                    Save
                  </IonButton>
                </IonCol>
                <IonCol>
                  <IonButton
                    expand="full"
                    onClick={() => {
                      this.dueDate.current.value = null;
                      this.body.current.value = null;
                      this.subject.current.value = null;
                      this.props.onDidDismiss();
                    }}
                  >
                    Cancel
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonToolbar>
        </IonFooter>
      </IonModal>
    );
  }
}

export default AddItemModal;
