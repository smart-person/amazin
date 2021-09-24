import LoadingOrError from 'src/components/LoadingOrError';
import MessageBox from 'src/components/MessageBox';
import CustomInput from 'src/components/CustomInput';

type PropType = {
  hook: [string, SetState];
  imgHandlers: {
    uploadState: StatusType;
    addImages: FnType;
    addImgOnEnter: FnType;
  };
};

export default function NewImageInput({ hook, imgHandlers: { uploadState, addImages, addImgOnEnter } }: PropType) {
  return (
    <div>
      Add
      <CustomInput text="New Images" wrapClass="flex-col" name="images" type="file" multiple onChange={addImages} />
      Or
      <CustomInput text="Image Link" wrapClass="flex-col" hook={hook} onKeyUp={addImgOnEnter} />
      <LoadingOrError statusOf={uploadState} />
      <MessageBox variant="info" msg={uploadState.msg} />
    </div>
  );
}
