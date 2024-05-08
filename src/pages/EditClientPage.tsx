// import { useRef } from "react";
import { useUpdateClient } from "../api/mutations";
import { useFormik } from "formik";
import { clientValidationSchema } from "../validators/validators";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useGetClientById } from "../api/queries";
import { ROUTES } from "../routes";
import { useEffect } from "react";

type FormValues = {
  imgSrc: string;
  name: string;
  surname: string;
  street: string;
  postCode: string;
  town: string;
  region: string;
  phoneNumber: string;
};

export const EditClientPage = () => {
  const params = useParams();
  const clientId: string = params.id ?? "";
  // ? Czy to powinno mieć jakiś mechanizm że jeśli ID puste to nie wykonuj całej reszty?
  const navigate = useNavigate();
  const { mutate } = useUpdateClient(clientId);
  const { data, isError, isLoading } = useGetClientById(params.id);

  const formik = useFormik<FormValues>({
    initialValues: {
      imgSrc: "",
      name: "",
      surname: "",
      street: "",
      postCode: "",
      town: "",
      region: "",
      phoneNumber: "",
    },
    onSubmit: (values: FormValues) => {
      mutate(values);
      navigate(ROUTES.clients);
    },
    validationSchema: clientValidationSchema,
  });

  useEffect(() => {
    if (data) {
      formik.setValues({
        imgSrc: data.imgSrc || "",
        name: data.name || "",
        surname: data.surname || "",
        street: data.street || "",
        postCode: data.postCode || "",
        town: data.town || "",
        region: data.region || "",
        phoneNumber: data.phoneNumber || "",
      });
    }
  }, [data]);
  // ? Co mu tu nie pasuje?

  if (isError) {
    return <p>Error</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!data) {
    return <p>Client not found</p>;
  }

  return (
    <form onSubmit={formik.handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1 className=" text-gray-700 text-lg font-bold mb-2">
        Edit Client - {data.name} {data.surname} (id: {data.id})
      </h1>
      <hr className="mb-4" />
      <div className="mb-4">
        <TextField
          error={Boolean(formik.touched.name && formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name ? formik.errors.name : null}
          id="name"
          label="Name"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
      </div>
      <div className="mb-4">
        <TextField
          error={Boolean(formik.touched.surname && formik.errors.surname)}
          helperText={formik.touched.surname && formik.errors.surname ? formik.errors.surname : null}
          id="surname"
          label="Surname"
          name="surname"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.surname}
        />
      </div>
      <div className="mb-4">
        <TextField
          error={Boolean(formik.touched.phoneNumber && formik.errors.phoneNumber)}
          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber ? formik.errors.phoneNumber : null}
          id="phoneNumber"
          label="Phone"
          name="phoneNumber"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phoneNumber}
        />
      </div>
      <div className="mb-4">
        <TextField
          error={Boolean(formik.touched.town && formik.errors.town)}
          helperText={formik.touched.town && formik.errors.town ? formik.errors.town : null}
          id="town"
          label="City"
          name="town"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.town}
        />
      </div>
      <div className="mb-4">
        <TextField
          error={Boolean(formik.touched.region && formik.errors.region)}
          helperText={formik.touched.region && formik.errors.region ? formik.errors.region : null}
          id="region"
          label="Region"
          name="region"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.region}
        />
      </div>
      <div className="mb-4">
        <TextField
          error={Boolean(formik.touched.street && formik.errors.street)}
          helperText={formik.touched.street && formik.errors.street ? formik.errors.street : null}
          id="street"
          label="Street"
          name="street"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.street}
        />
      </div>
      <div className="mb-4">
        <TextField
          error={Boolean(formik.touched.postCode && formik.errors.postCode)}
          helperText={formik.touched.postCode && formik.errors.postCode ? formik.errors.postCode : null}
          id="postCode"
          label="ZIP"
          name="postCode"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.postCode}
        />
      </div>
      <button className="bg-gray-700 hover:bg-gray-500 text-white flex items-center font-bold py-2 px-4 rounded" type="submit">
        Apply
      </button>
      <Link
        to={ROUTES.clients}
        className="bg-gray-700 hover:bg-gray-500 text-white flex items-center font-bold py-2 px-4 rounded"
      >
        Cancel
      </Link>
    </form>
  );
};
