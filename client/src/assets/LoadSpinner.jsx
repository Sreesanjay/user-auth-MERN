import ClipLoader from "react-spinners/ClipLoader";
import PropTypes from 'prop-types';

export default function LoadSpinner({isLoading}) {
  return (
    <div>
       <ClipLoader color={"#FF0000"} loading={isLoading} size={100} />
    </div>
  )
}
LoadSpinner.propTypes = {
    isLoading: PropTypes.bool.isRequired,
};

