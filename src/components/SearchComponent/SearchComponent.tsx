import React from "react";
import { Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import { useAddVideo } from "./useAddVideo";

const SearchComponent = () => {
  const { findVideoData, inputValue, mistake, setInputValue } = useAddVideo();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    findVideoData(inputValue);
  };

  return (
    <div>
      <form
        className="search d-flex justify-content-center"
        onSubmit={(e) => handleSubmit(e)}
      >
        <InputGroup>
          <Input
            placeholder="Add vimeo / youtube link"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <InputGroupAddon addonType="append">
            <InputGroupText
              onClick={() => findVideoData(inputValue)}
              role="button"
              disabled={inputValue.length ? false : true}
            >
              Add video
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </form>
      <div
        className={
          mistake.happened
            ? "wrongAddressDiv wrongAddressDiv_active"
            : "wrongAddressDiv"
        }
      >
        {mistake.message ? mistake.message : "Holder"}
      </div>
    </div>
  );
};

export default SearchComponent;
