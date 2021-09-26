import { BaseTextFieldProps, InputAdornment, TextField } from "@material-ui/core";

import { FilterList } from "@mui/icons-material";

export interface ITextField extends BaseTextFieldProps {
    filter: (term: string, field: string) => void;
}
const TextFieldFilter: React.FC<ITextField> = (props: ITextField) => {
    return (
        <TextField
            variant="standard"
            type="text"
            autoFocus
            onChange={(e) => {
                props.filter(e.target.value, "name");
            }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <FilterList />
                    </InputAdornment>
                ),
            }}
            {...props}
        />
    );
};

export default TextFieldFilter;
