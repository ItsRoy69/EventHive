
import { Download, Features, SectionWrapper } from './components';
import assets from './assets';
import styles from './styles/Global';

const App = () => {
  return (
    <>
      <SectionWrapper
        title="Where events come together"
        description="Streamline your event planning with EventHive - the all-in-one platform.
        From coordination to celebration, we make luxury events effortless."
        showBtn
        mockupImg={assets.homeHero}
        banner="banner"
      />
      <SectionWrapper
        title="Smart User Interface Event Management Platform"
        description="With EventHive, planning your dream event has never been easier. Say goodbye to scattered spreadsheets and endless email chains - embrace the future of event planning today"
        mockupImg={assets.homeCards}
        reverse
      />
      <SectionWrapper
        title="Creative way to manage your event"
        description="Our platform brings together all the tools you need to create unforgettable experiences, from seamless vendor management and guest coordination to intuitive design features and AI-powered assistance."
        mockupImg={assets.mockup}
        banner="banner02"
      />
      <SectionWrapper
        title="Function"
        description="Whether you're planning a grand wedding, a corporate gala, or an intimate gathering, EventHive empowers you to focus on what matters most - creating magical moments that will be cherished for a lifetime."
        mockupImg={assets.feature}
        reverse
      />

      <Features />
      <Download />

      <div className="px-4 py-2 justify-center items-center bg-primary flex-col text-center banner04">
        <p className={`${styles.pText} ${styles.whiteText}`}>Made with love by {" "}
          <span className="bold">Fueled Fusions</span>
        </p>
      </div>
    </>
  );
}

export default App;
