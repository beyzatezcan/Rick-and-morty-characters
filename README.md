# Rick and Morty Karakter Arayüzü

Bu proje, **Massive Bioinformatics Frontend Internship** kapsamında geliştirilmiştir. Rick and Morty evrenindeki karakterlerin bilgilerini listeleyen, filtreleme ve sıralama gibi özellikler sunan kullanıcı dostu bir web arayüzüdür. Proje, React ile sıfırdan geliştirilmiş olup sade, işlevsel ve hızlı bir deneyim sunmayı amaçlamaktadır.

 **Canlı uygulamaya göz atmak için:**  
[rick-and-morty-characters-alpha-fawn.vercel.app](https://rick-and-morty-characters-alpha-fawn.vercel.app/)

---

##  Projenin Amacı

- React kullanarak modern ve temiz bir kullanıcı arayüzü geliştirmek  
- Dış bir API’den veri çekip kullanıcıya sunmak  
- Filtreleme, sıralama ve sayfalama gibi temel frontend işlevlerini uygulamak  
- Hataları yönetmek ve kullanıcıya geri bildirim sağlamak  
- Detaylı karakter görüntüleme özelliği ile kullanıcı etkileşimini artırmak

---

##  Özellikler

- 250+ karakteri Rick and Morty API'den çeker   
- Statü (Alive, Dead, Unknown), cinsiyet ve tür filtreleri  
- İsme göre A-Z, Z-A, ID sıralama seçenekleri  
- Sayfa başına gösterim sayısı seçilebilir  
- Seçilen karakterin detayları (konum, tür, bölüm sayısı) sayfanın altında gösterilir  
- Filtreye uyan karakter bulunamazsa uyarı verilir  
- Hatalı API çağrılarında kullanıcıya bildirim sunar

---

##  Kullanılan Teknolojiler

- React (Next.js App Router)
- TypeScript
- Fetch API
- Tailwind CSS (temel stiller) + inline stiller
- Rick and Morty public API

---

##  Ekran Görüntüleri

### Ana Sayfa
<img width="1710" alt="Screenshot 2025-06-08 at 16 23 34" src="https://github.com/user-attachments/assets/499bd94c-2ed3-45a7-a7bc-b7167875c67d" />


### Filtreleme ve Karakter Detayı
<img width="1710" alt="Screenshot 2025-06-08 at 16 24 24" src="https://github.com/user-attachments/assets/e349331e-92d8-4c6b-97f8-243c56a767be" />


---

##  Projeyi Çalıştırmak

Aşağıdaki adımları izleyerek projeyi kendi bilgisayarınızda çalıştırabilirsiniz:

```bash
git clone https://github.com/yourusername/rick-and-morty-characters.git
cd rick-and-morty-characters
npm install
npm run dev
