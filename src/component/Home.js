import Notes from "./Notes";

export const Home = (props) => {
  
  return (
    <div>
      {console.log(localStorage.getItem('token'))}
      <Notes showAlert={props.showAlert}/>
    </div>
  );
};
