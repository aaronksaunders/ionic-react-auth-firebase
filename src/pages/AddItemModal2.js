import React, { useState } from "react";
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
  IonDatetime,
} from "@ionic/react";

const AddItemModal2 = ({ showModal, onDidDismiss }) => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [dueDate, setDueDate] = useState("");

  return (
    <IonModal isOpen={showModal} onDidDismiss={() => onDidDismiss()}>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Add Item</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent padding>
        <p>This is modal content</p>
        <IonItem>
          <IonLabel position="stacked">Subject</IonLabel>
          <IonInput
            type="text"
            onIonChange={(e) => setSubject(e.detail.value)}
            name="subject"
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Due Date</IonLabel>
          <IonDatetime
            display-format="MMM DD, YYYY"
            onIonChange={(e) => setDueDate(e.detail.value)}
            name="dueDate"
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Summary</IonLabel>
          <IonTextarea
            rows={6}
            onIonChange={(e) => setBody(e.detail.value)}
            name="body"
          />
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
                    let returnValues = {
                      dueDate,
                      body,
                      subject,
                    };
                    onDidDismiss({ result: returnValues });
                    setDueDate("");
                    setBody("");
                    setSubject("");
                  }}
                >
                  Save
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton
                  expand="full"
                  onClick={() => {
                    setDueDate("");
                    setBody("");
                    setSubject("");
                    onDidDismiss();
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
};

export default AddItemModal2;
