import { useNavigate, useParams } from "react-router-dom";
import fetchPet from "./fecthPet";
import { useQuery } from "@tanstack/react-query";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";
import { useContext, useState } from "react";
import AdoptPetContext from "./AdoptedPetContext";

const Details = () => {
  const navigate = useNavigate();
  const [, setAdoptedPet] = useContext(AdoptPetContext);

  const [showModal, setShowModal] = useState(false);

  const { id } = useParams();
  const result = useQuery(["dateils", id], fetchPet);
  if (result.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  const pet = result.data.pets[0];

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <h1>{pet.name}</h1>
      <h2>
        `${pet.animal} - ${pet.breed} - ${pet.city}, ${pet.state}`
      </h2>
      <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
      <p>{pet.description}</p>
      {showModal ? (
        <Modal>
          <div>
            <h1>Whould you like to adopt {pet.name}</h1>
            <div className="buttons">
              <button
                onClick={() => {
                  setAdoptedPet(pet);
                  navigate("/");
                }}
              >
                Yes
              </button>
              <button onClick={() => setShowModal(false)}>No</button>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

// export default Details;
