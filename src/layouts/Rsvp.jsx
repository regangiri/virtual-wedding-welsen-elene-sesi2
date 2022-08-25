import { useEffect, useState } from "react";
import { addRSVP } from "../helpers/supabase";
import Select from "../components/Select";
import ModalNotif from "../components/ModalNotif";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import { IoMapOutline as MapIcon } from "react-icons/io5";
import Link from "next/link";

const options = [
  { id: 1, value: "Hadir" },
  { id: 2, value: "Tidak Hadir" },
];

const jumlahOrang = [
  { id: 1, value: 0 },
  { id: 2, value: 1 },
  { id: 3, value: 2 },
];

function Rsvp() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [totalGuest, setTotalGuest] = useState(jumlahOrang[0]);
  const [confirmation, setConfirmation] = useState(options[0]);
  const [pemberkatanRsvp, setPemberkatanRsvp] = useState("");
  const [resepsiRsvp, setResepsiRsvp] = useState("");

  const { ref, inView } = useInView();
  const titleAnimation = useAnimation();
  const videoAnimation = useAnimation();
  const rightAnimation = useAnimation();

  useEffect(() => {
    if (inView) {
      titleAnimation.start({
        opacity: 1,
        transition: {
          duration: 1,
        },
      });
      videoAnimation.start({
        x: 0,
        opacity: 1,
        transition: {
          duration: 1,
        },
      });
      rightAnimation.start({
        x: 0,
        opacity: 1,
        transition: {
          duration: 1,
        },
      });
    }
    if (!inView) {
      titleAnimation.start({
        opacity: 0,
      });
      videoAnimation.start({
        x: 0,
        opacity: 0,
      });
      rightAnimation.start({
        x: 0,
        opacity: 0,
      });
    }
  }, [inView]);

  const resetForm = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    setName("");
    setTelephone("");
    setTotalGuest(jumlahOrang[0]);
    setPemberkatanRsvp("");
    setResepsiRsvp("");
    setConfirmation(options[0]);
    document.querySelector('input[name="pemberkatan"]:checked').checked = false;
    document.querySelector('input[name="resepsi"]:checked').checked = false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addRSVP(
      name,
      telephone,

      totalGuest.value,
      pemberkatanRsvp,
      resepsiRsvp
    );
    setShowModal(true);
    resetForm();
  };
  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-xl bg-primary py-12">
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 left-0 bg-gray-50" />
      </div>
      <div className="relative lg:grid lg:grid-cols-1 ">
        <div className="flex flex-col items-center justify-center text-sm font-semibold font-baskerville ">
          <h1 className="text-xl xxs:text-3xl sm:text-5xl font-baskerville mb-10 font-bold border-b-2 border-black pb-3">
            Resepsi Pernikahan
          </h1>
          <p className="text-[22px] font-semibold font-baskerville py-1">
            Sabtu, 24 September 2022
          </p>
          <div className="flex text-xs xxs:text-sm items-center font-baskerville justify-center py-3 w-full">
            <div className="flex px-2 text-sm xxs:text-[15px] flex-col items-center justify-center w-full">
              <p className="font-bold  ">Tea Pai</p>
              <p className="">14.00 - 15.00 WIB</p>
            </div>
            <div className="border-l-[1px] text-sm xxs:text-[15px] xxs:px-2 font-baskerville border-black flex items-center justify-center flex-col w-full">
              <p className="font-bold">
                Resepsi Pernikahan<sup>*)</sup>
              </p>
              <p className="">16.00 - 17.30 WIB</p>
            </div>
          </div>
          <div className="address-box flex flex-col items-center justify-center text-sm font-semibold font-baskerville py-3">
            <p className="pt-2 text-[22px] py-2">Hotel Morrissey, Lt.6</p>
            <p className="text-xs text-center sm:text-base px-2 pb-6">
              Jl. KH Wahid Hasyim No.70, Menteng, Jakarta Pusat
            </p>
            <Link href={`https://goo.gl/maps/MYM5sQHHyDWeBPTn9`}>
              <a
                target="_blank"
                className="md:w-full lg:w-full text-center w-64 flex items-center space-x-2 justify-center px-8 py-3  border border-secondary bg-secondary text-white text-base font-medium rounded-3xl text-button  hover:backdrop-blur-xl hover:bg-transparent hover:text-secondary md:py-2 md:text-lg md:px-10 max-w-sm font-baskerville"
              >
                <MapIcon className="h-6 w-6" aria-hidden="true" />{" "}
                <span className="hover:cursor-pointer">Lihat Peta</span>
              </a>
            </Link>
          </div>
        </div>
        <div
          animate={videoAnimation}
          className="nb ml-2 px-4 text-left text-sm font-bold font-baskerville"
        >
          *) Catatan: Resepsi pernikahan akan digelar di area Outdoor
        </div>
        <div className="lg:col-span-12 py-16  xl:col-span-3 xl:rounded-r-2xl xl:rounded-l-none lg:rounded-b-2xl lg:border px-auto">
          <div className="flex flex-col items-center justify-center text-sm font-semibold font-baskerville">
            <h1
              animate={videoAnimation}
              className="text-3xl font-baskerville mb-8 font-bold  pb-3"
            >
              RSVP
            </h1>
            <h1
              animate={videoAnimation}
              className="text-base mx-auto w-full text-left px-10 relative font-baskerville mb-8 font-semibold"
            >
              Mohon bantuannya untuk mengisi form dibawah ini
            </h1>
            <form
              animate={rightAnimation}
              onSubmit={handleSubmit}
              action="#"
              method="POST"
              className="grid grid-cols-1 gap-y-6 px-10 lg:px-0"
              id="formRSVP"
            >
              <div className="lg:mx-auto md:mx-auto">
                <p className="text-base font-baskerville font-semibold">
                  Nama Lengkap
                </p>
                <label htmlFor="name" className="sr-only">
                  Full name
                </label>
                <input
                  autoComplete="off"
                  required
                  onChange={(event) => setName(event.target.value)}
                  type="text"
                  name="name"
                  id="name"
                  className="block shadow-sm lg:w-96 w-full md:w-[500px] py-3 px-4 placeholder-gray-500 focus:ring-accent focus:border-accent border-gray-300 rounded-md"
                />
              </div>
              <div className="lg:mx-auto md:mx-auto">
                <p className="text-base font-baskerville font-semibold">
                  Nomor Telepon
                </p>
                <label htmlFor="telephone" className="sr-only">
                  Telephone Number
                </label>
                <input
                  autoComplete="off"
                  required
                  onChange={(event) => setTelephone(event.target.value)}
                  type="number"
                  name="telephone"
                  id="telephone"
                  className="block shadow-sm lg:w-96 w-full md:w-[500px] py-3 px-4 placeholder-gray-500 focus:ring-accent focus:border-accent border-gray-300 rounded-md"
                />
              </div>

              <div className="mx-auto lg:w-96 w-full md:w-[500px]">
                <p className="text-base font-baskerville font-semibold">
                  Jumlah Orang
                </p>
                <Select
                  selected={totalGuest}
                  setSelected={setTotalGuest}
                  options={jumlahOrang}
                />
              </div>

              <h5 className="py-0 text-base font-medium font-baskerville">
                Apakah anda dapat menghadiri
                <b> Pemberkatan Pernikahan di Gereja?</b>
              </h5>
              <div
                onChange={(e) => {
                  setResepsiRsvp(e.target.value);
                  console.log(e.target.value);
                }}
                className="mx-auto lg:w-96 w-full md:w-[500px] text-base font-baskerville"
              >
                <input
                  type="radio"
                  id="ya"
                  name="resepsi"
                  value="ya"
                  required
                />
                <label htmlFor="ya" className="mx-1 mr-3 p-2">
                  Ya
                </label>

                <input type="radio" id="tidak" name="resepsi" value="tidak" />
                <label className="mx-1 p-2" htmlFor="tidak">
                  Tidak
                </label>
              </div>
              <h5 className="py-0 text-base font-medium font-baskerville">
                Apakah anda dapat menghadiri
                <b> Resepsi Pernikahan di Hotel Morissey?</b>
              </h5>

              <div
                onChange={(e) => {
                  setPemberkatanRsvp(e.target.value);
                  console.log(e.target.value);
                }}
                className="mx-auto lg:w-96 w-full md:w-[500px] text-base font-baskerville"
              >
                <input type="radio" id="ya" name="pemberkatan" value="ya" />
                <label htmlFor="ya" className="mx-1 mr-3 p-2">
                  Ya
                </label>

                <input
                  type="radio"
                  id="tidak"
                  name="pemberkatan"
                  value="tidak"
                  required
                />
                <label className="mx-1 p-2" htmlFor="tidak">
                  Tidak
                </label>
              </div>
              <div className="mx-auto lg:w-96 w-full md:w-[500px]">
                <button
                  type="submit"
                  className="inline-flex lg:w-96 w-full md:w-[500px] justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-secondary hover:bg-transparent hover:border-secondary hover:backdrop-blur-md hover:text-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 font-baskerville focus:ring-accent"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ModalNotif
        open={showModal}
        setOpen={setShowModal}
        title="RSVP has been sent!"
        description={"RSVP has been sent.Thank you for your participation."}
      />
    </div>
  );
}

export default Rsvp;
