import React from "react";
import Icon from "../images/icon.png";

const InfoContent = (props) => {
  const { name } = props;

  return (
    <div>
      {name ? (
        <div class="row justify-content-center ">
          <div class="col-3">
            <img
              style={{ width: "100%", height: "100%" }}
              src={name.img}
              alt="Logo"
            />
          </div>
          <div class="col-9">
            <div class="row mr-2">
              <h5>
                {name.marque} {name.model}
              </h5>
            </div>

            <h5>
              <div class="row">
                <h6>
                  {" "}
                  <img src={Icon} alt="Logo" />
                  {name.adresse}
                </h6>
              </div>

              <div class="row m-1">
                <div class="col-6 mr-2">{name.motorisation}</div>
                <div class="col-6">{name.type}</div>
              </div>
            </h5>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default InfoContent;
