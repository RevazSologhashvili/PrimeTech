import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MainServices from "./components/MainServices";
import SectionTitle from "./components/SectionTitle";

export default function Home() {
  return (
    <main className=" min-h-screen overflow-hidden">
      <Header />
      <Hero />
      
      <section className="bg-gradient-to-t from-gray-900/95 to-gray-800/95 text-gray-100 py-16">
        <SectionTitle 
          title="ჩვენი სერვისები" 
          subtitle="გთავაზობთ მაღალი ხარისხის აიტი მხარდაჭერის სერვისებს ნებისმიერი ზომის ბიზნესისთვის"
        />
      
        <MainServices 
          MainServicesTitle="აიტი მხარდაჭერა მცირე ბიზნესისთვის" 
          MainServicesDescription="ჩვენი სერვისი მოიცავს როგორც კომპიუტერების ტექნიკურ და პროგრამულ უზრუნველყოფას, ასევე ვირუსებისგან დაცვას და დაკარგული ინფორმაციების აღდგენას. ჩვენ ვეხმარებით მცირე ბიზნესებს ტექნოლოგიების მარტივად და ეფექტურად გამოყენებაში."
          imageSrc="/small-business-it-support.jpg"
          imagePosition="right"
          accentColor="from-blue-400 to-blue-600"
        />
        
        <MainServices 
          MainServicesTitle="აიტი მხარდაჭერა დიდი ბიზნესის და კორპორაციებისთვის" 
          MainServicesDescription="კორპორატიული კლიენტებისთვის გთავაზობთ მასშტაბურ IT გადაწყვეტილებებს, 24/7 ტექნიკურ მხარდაჭერას. ჩვენი ექსპერტები დაგეხმარებიან თქვენი IT ინფრასტრუქტურის ოპტიმიზაციაში."
          imageSrc="/enterprise-it-support.jpg"
          imagePosition="left"
          accentColor="from-blue-400 to-blue-600"
        />
      </section>

    <AboutUs />
      

      <Footer />
    </main>
  );
}