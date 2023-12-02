const Content = () => {

    return(
        <>
            <article className="prose prose-slate pr-6">
                <h2 id="content1">About</h2>
                <p>
                    MADANI Information and Knowledge Library (MADANILib) adalah portal 
                    sistem informasi dan pengetahuan internal MADANI Berkelanjutan. 
                    MADANILib dibuat untuk memudahkan personel MADANI dalam mencari dan 
                    mendapatkan informasi yang lengkap seputar kerja-kerja organisasi. 
                    MADANILib dapat digunakan untuk berbagai keperluan, seperti memahami 
                    Rencana Strategis Organisasi, SOP dan ketentuan internal, mengakses 
                    publikasi, serta mendapatkan serta memperbaharui data dan informasi 
                    yang telah dikumpulkan organisasi.
                </p>

                <h2  id="content2">FAQ</h2>

                <h3>1. Siapa yang dapat mengakses informasi di MADANILib ?</h3>
                <p>
                    Jika kamu staff Madani, kamu dapat mengakses seluruh informasi di dalam MADANILibs.
                </p>

                <h3>2. Apa saja informasi yang bisa saya dapatkan di MADANILib ?</h3>
                <ul className="list-disc">
                    <li>
                        Bagian Dashboard: kamu cukup mengetik kata kunci informasi yang 
                        kamu inginkan di kolom pencarian. Kemudian, kamu bisa melihat atau 
                        mengunduh informasi tersebut ke dalam format tertentu sehingga mudah 
                        dijadikan bahan ajar atau digunakan. Selain itu, terdapat update berkala 
                        pada “Whats up Madani”, “Program”, “Knowledge Center” dan “Directory Contact”.
                    </li>
                    <li>
                        Bagian What's Up Madani: kamu akan memperoleh informasi terkait 
                        hasil rapat “Team Leader” yang diselenggarakan tiap minggu dan 
                        informasi “Save the Date” kegiatan organisasi di setiap bulannya.
                    </li>
                    <li>
                        Bagian SOP & Guidelines: kamu akan memperoleh informasi terkait SOP 
                        dan ketentuan resmi serta prosedur pelaksanaannya  yang telah 
                        diberlakukan di organisasi. 
                    </li>
                    <li>
                        Bagian Program: kamu akan memperoleh informasi yang berkaitan 
                        dengan program meliputi Work Plan, Proposal ke Donor, Laporan 
                        ke Donor hingga detail aktivitas program.
                    </li>
                    <li>
                        Bagian Knowledge Center: kamu akan memperoleh banyak informasi 
                        seputar rencana strategis organisasi, publikasi, peraturan regulasi, 
                        database tabular dan spasial, materi literasi dan lain sebagainya.
                    </li>
                    
                </ul>
                
                <h3>3. Informasi apa saja yang dapat saya masukkan ke dalam MADANILib ?</h3>
                <ul className="list-disc">
                    <li>
                        Informasi yang dapat diunggah ke dalam MADANILib adalah seluruh 
                        informasi (dokumen digital, foto dan video) yang bersifat “Final.” 
                        Informasi yang masih bersifat “draft” tidak diperkenankan untuk 
                        dimasukkan ke dalam portal ini.
                    </li>
                    <li>
                        Format file yang dapat diunggah adalah PDF; M.Word;  Ms. Excel; 
                        CSV; dan segala format foto dan video.
                    </li>
                    <li>
                        Ukuran File yang dapat diunggah tidak lebih dari 20 Mega Byte 
                        (MB) bagi setiap file. Jika ukuran file melebihi ketentuan 
                        tersebut kamu dapat melakukan alternatif cara dengan melakukan 
                        compressing file secara online atau cukup menyertakan tautan/link 
                        file dari Gdrive kamu yang telah dibukakan aksesnya.
                    </li>
                </ul>

                <h3>4. Siapa yang dapat memperbarui informasi di MADANILib ?</h3>
                <p>
                    Pembaruan informasi dapat dilakukan oleh staff sesuai dengan tanggung jawab divisinya. Lengkapnya:
                </p>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                            <th>NO</th>
                            <th>Bagian</th>
                            <th>Tanggung Jawab Pembaruan</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>1</th>
                                <td>What's Up Madani?</td>
                                <td>
                                    <ul className="list-disc">
                                        <li>Weekly Updates (HRGA Division)</li>
                                        <li>Event Calendar (All Division)</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <th>2</th>
                                <td>Bagian SOP & Guidelines</td>
                                <td>
                                    <ul className="list-disc">
                                        <li>SOP & Guidelines Finance (Finance Division)</li>
                                        <li>SOP & Guidelines Communication (Communication Division)</li>
                                        <li>SOP & Guidelines HRGA (HRGA Division)</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <th>3</th>
                                <td>Program</td>
                                <td>
                                    <ul className="list-disc">
                                        <li>Workplan, Proposal, Reports, Activities (Program Division)</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <th>4</th>
                                <td>Knowledge Center</td>
                                <td>
                                    <ul className="list-disc">
                                        <li>Rencana Strategis Organisasi; Publikasi; materi literasi; peraturan dan regulasi; database spasial dan tabular; media monitoring (Knowledge Management Division)</li>
                                        <li>Direktori kontak; siaran pers, Asset Foto dan Video; Laporan sosial Media; Infografis (Communication Division)</li>
                                        <li>Catatan Rapat Eksternal (All Division)</li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </article>
        </>
    )
}

export default Content