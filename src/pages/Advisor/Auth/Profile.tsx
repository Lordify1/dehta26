import { advisorUrl, appName } from "@/dapp";
import { classMap } from "@/components/Tools/Misc";
import { useUser } from "@/context/UserContext";
import { founderSidebar } from "@/data/founderSidebarData";
import { investorSidebar } from "@/data/investorSidebarData";
import DashboardLayout from "@/layouts/Advisor/DashboardLayout";
import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { FaCopy, FaEdit, FaMoneyBillWave } from "react-icons/fa";
import {
  CopyToClipboard,
  emptyResult,
  Lens,
  Loading,
  FormatAmount,
  LoadingDiv,
  postData,
  UpperCase,
} from "../../../components/Tools/Misc";
import AchievementPanel from "../../../components/Advisor/Achievements";
import LensActivity from "../../../components/Advisor/LensActivity";
import CheckInCalendar from "../../../components/Advisor/CheckInCalendar";
import { useOffCanvas } from "../../../context/OffCanvasContext";
import Offcanvas from "../../../components/ui/Offcanvas";
import EditProfile from "../../../components/Advisor/Forms/EditProfile";
import { apiUrl, appUrl } from "../../../App";
import axios from "axios";
import ReferralList from "../../../components/Advisor/ReferralList";
import LensWithdrawal from "../../../components/Advisor/Forms/LensWithdrawForm";

const Profile = () => {
  const { user, setUser } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
    role: user?.role || "founder",
    avatar: user?.avatar,
  });

  const fileInputRef = useRef(null);
  const [userGlasses, setUserGlasses] = useState<
    Array<{ id: string; icon: string; [key: string]: any }>
  >([]);
  const { setShowOffCanvas, OffId, Offtitle, setOffId, SetOfftitle } =
    useOffCanvas();

  const sidebarData =
    data.role === "founder" ? founderSidebar : investorSidebar;

  // Handle real avatar upload
  const handleAvatarUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await axios.post(
        `${apiUrl}/api/profile/avatar_upload`,
        formData,
      );

      // Update UI avatar
      setData((prev) => ({ ...prev, avatar: res.data.avatar_url }));

      // // Update global user data
      setUser((prev) => ({ ...prev, avatar: res.data.avatar_url }));
    } catch (err) {
      console.error("Error uploading avatar:", err);
    }
  };

  const getUserGlasses = async () => {
    try {
      const res = await axios.post(`${apiUrl}/api/glass/user_glasses`);
      setUserGlasses(res.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserGlasses();
  }, []);

  const groupedGlasses = userGlasses.reduce(
    (acc, item) => {
      if (!item?.id) return acc;

      const key = item.id;
      if (!acc[key]) {
        acc[key] = {
          id: item.id,
          icon: item.icon,
          count: 1,
        };
      } else {
        acc[key].count += 1;
      }

      return acc;
    },
    {} as Record<string, { id: string; icon: string; count: number }>,
  );

  return (
    <>
      <Helmet>
        <title>Profile - {appName}</title>
      </Helmet>

      <DashboardLayout
        title="Profile"
        user={user}
        sidebarDataType={data.role}
        sidebarData={sidebarData}
      >
        <section className="grid grid-cols-1 gap-3">
          <div
            className={`${classMap.dehtaCard()} grid grid-cols-1 lg:grid-cols-2 p-2 mt-2 mb-2`}
          >
            <div
              className="flex flex-col items-center justify-center p-4"
              aria-label="User profile"
            >
              {/* Avatar */}
              <div
                className="relative"
                role="group"
                aria-roledescription="avatar upload"
              >
                <img
                  src={data.avatar || "/logo.svg"}
                  alt={`${user?.username || "User"} avatar`}
                  loading="lazy"
                  className={`${classMap.dehtaBorder()} rounded-full w-24 h-24 object-cover bg-accent`}
                />

                {/* Trigger upload instantly */}
                <button
                  type="button"
                  onClick={() =>
                    (fileInputRef.current as HTMLInputElement | null)?.click()
                  }
                  className="absolute bottom-0 right-0 bg-accent text-white p-2 rounded-full shadow-md hover:opacity-90 focus:outline-none focus:ring"
                  aria-label="Change profile picture"
                  title="Change profile picture"
                >
                  <FaEdit size={14} />
                </button>

                {/* Hidden Upload Input */}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef as any}
                  className="hidden"
                  aria-hidden="true"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    // show a quick local preview while upload completes
                    try {
                      const preview = URL.createObjectURL(file);
                      setData((prev) => ({ ...prev, avatar: preview }));
                    } catch (err) {
                      /* ignore preview errors */
                    }
                    handleAvatarUpload(file);
                    // allow re-uploading same file again
                    e.currentTarget.value = "";
                  }}
                />
              </div>

              <div className="text-center mt-3">
                <p className="font-semibold">{data.name || user?.username}</p>
                {/* {user?.email && <p className="text-xs text-muted-foreground">{user.email}</p>} */}
                <small className="inline-block mt-1 px-2 py-0.5 text-xs rounded bg-muted text-muted-foreground">
                  {UpperCase(user?.role)}
                </small>
              </div>

              <div className="mt-3 w-full flex flex-col items-center gap-2">
                <section
                  className={`${classMap.glassCard()} px-3 py-1 flex flex-col justify-center items-center gap-2`}
                  aria-live="polite"
                >
                  <div className="flex">
                    {Lens()}
                    <span className="font-medium">
                      <FormatAmount amount={user?.total_lens ?? 0} /> &nbsp;
                      Lens
                    </span>
                  </div>
                  <button className={`${classMap.button()} btn-sm text-sm`}>
                    <span className="text-sm flex items-center justify-items-center">
                      <FaMoneyBillWave /> &nbsp; Withdraw
                    </span>
                  </button>
                </section>

                {user?.ref_id && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="font-mono bg-muted px-2 py-1 rounded">
                      {user.ref_id}
                    </span>
                    <CopyToClipboard
                      text={`${appUrl}/register?ref=${user.ref_id}`}
                      alertMessage="Referral Link Copied"
                    />
                  </div>
                )}
              </div>

              <button
                className={`${classMap.button()} mt-4 flex items-center justify-center`}
                onClick={() => {
                  SetOfftitle("Edit Profile");
                  setOffId("editProfile");
                  setShowOffCanvas(true);
                }}
                aria-haspopup="dialog"
                aria-controls="editProfile"
              >
                Edit Profile
              </button>
            </div>

            {/* Glass NFTs */}
            <div className="flex flex-col mt-3">
              <div className="flex flex-col lg:flex-row min-h-80 w-full items-center justify-center">
                {isLoading ? (
                  <Loading />
                ) : userGlasses.length > 0 ? (
                  userGlasses.map((glass) => (
                    <div
                      key={glass.id}
                      className={`${classMap.dehtaBorder()} rounded-2xl flex flex-col items-center relative mx-1 my-1`}
                    >
                      <img
                        src={glass.icon}
                        alt=""
                        loading="lazy"
                        className="w-30"
                      />

                      {glass.count > 1 && (
                        <span className="absolute top-1 right-1 bg-accent text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                          x{glass.count}
                        </span>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="opacity-50">
                    {emptyResult("Your Glasses will appear here")}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <AchievementPanel userAchievements={user?.achievements} />
            <LensActivity userTransact={user?.lens_transactions} />
            <CheckInCalendar
              lens={() => {}}
              streak={() => {}}
              checkins={user?.checkins[0]}
              transactions={() => {}}
              history={user?.checkinhistory}
              dView="history"
            />
            <ReferralList />
          </div>
        </section>

        <Offcanvas title={Offtitle}>
          {OffId === "editProfile" && <EditProfile />}
          {OffId === "lensWithdraw" && <LensWithdrawal />}
        </Offcanvas>
      </DashboardLayout>
    </>
  );
};

export default Profile;
