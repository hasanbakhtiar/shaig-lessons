import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "./_Contact.scss";
import ExportIcon from "../../assets/icons/ExportIcon.svg";
import SearchIcon from "../../assets/icons/SearchIcon.svg";
import DeleteIcon from "../../assets/icons/DeleteIcon.svg";
import EditIcon from "../../assets/icons/EditIcon.svg";
import DeleteConfirmModalIcon from "../../assets/icons/DeleteConfirmModalIcon.svg";

const Contact = () => {
  // URL parametrelerini yönetmek için hook
  const [searchParams, setSearchParams] = useSearchParams();

  // State tanımlamaları
  const [contactsData, setContactsData] = useState([]); // Sayfalanmış contact verileri
  const [originalContactsData, setOriginalContactsData] = useState([]); // Orijinal contact verileri
  const [loading, setLoading] = useState(true); // Loading state
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  ); // Arama terimi
  const [pagination, setPagination] = useState({
    current_page: 1,
    has_next: false,
    total: 0,
    total_pages: 1,
  }); // Sayfalama bilgileri
  const [showModal, setShowModal] = useState(false); // Modal görünürlüğü
  const [isEditing, setIsEditing] = useState(false); // Düzenleme modu
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // Silme onay modalı
  const [itemToDelete, setItemToDelete] = useState(null); // Silinecek öğe
  const tableRef = useRef(null); // Tablo referansı
  const [pageSize, setPageSize] = useState(
    Number(searchParams.get("limit")) || 20
  ); // Sayfa başına öğe sayısı
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  ); // Mevcut sayfa

  // Yeni contact için form verileri
  const [newItem, setNewItem] = useState({
    contact_phone: "",
    contact_email: "",
    contact_location: "",
    contact_whatsapp: "",
    contact_instagram: "",
    contact_facebook: "",
    contact_tiktok: "",
    contact_youtube: "",
    contact_linkedin: "",
  });

  /**
   * API'den contact verilerini getirir
   */
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/contact`
      );
      const data = response?.data;
      setOriginalContactsData(data);
      setContactsData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line
  }, []);

  const applyFiltersAndSearch = () => {
    let filteredData = [...originalContactsData];

    if (searchTerm) {
      filteredData = filteredData.filter(
        (item) =>
          (item.contact_email &&
            item.contact_email
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (item.contact_phone &&
            item.contact_phone
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (item.contact_location &&
            item.contact_location
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
    }

    // Sayfalama hesaplamaları
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    // State'leri güncelle
    setContactsData(paginatedData);
    setPagination({
      current_page: currentPage,
      has_next: currentPage < totalPages,
      total: totalItems,
      total_pages: totalPages,
    });
  };

  // Arama terimi, sayfa boyutu veya mevcut sayfa değiştiğinde filtreleri uygula
  useEffect(() => {
    if (originalContactsData.length > 0) {
      applyFiltersAndSearch();
    }
    // eslint-disable-next-line
  }, [searchTerm, pageSize, currentPage, originalContactsData]);

  /**
   * Sayfa değiştirme işleyicisi
   */
  const handlePageChange = (page) => {
    setCurrentPage(page);

    // URL parametrelerini güncelle
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (page > 1) params.set("page", page.toString());
    if (pageSize !== 20) params.set("limit", pageSize.toString());
    setSearchParams(params);

    // Tablo bölümüne yumuşak kaydırma
    const tableSection = document.querySelector(".table-section");
    if (tableSection) {
      tableSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  /**
   * Sayfa boyutu değiştirme işleyicisi
   */
  const handlePageSizeChange = (e) => {
    const newPageSize = Number(e.target.value);
    setPageSize(newPageSize);
    setCurrentPage(1);

    // URL parametrelerini güncelle
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    params.set("page", "1");
    if (newPageSize !== 20) params.set("limit", newPageSize.toString());
    setSearchParams(params);

    // Tablo bölümüne yumuşak kaydırma
    const tableSection = document.querySelector(".table-section");
    if (tableSection) {
      tableSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  /**
   * Arama işleyicisi
   */
  const handleSearch = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    setCurrentPage(1);

    // URL parametrelerini güncelle
    const params = new URLSearchParams();
    if (newSearchTerm) params.set("search", newSearchTerm);
    if (currentPage > 1) params.set("page", currentPage.toString());
    if (pageSize !== 20) params.set("limit", pageSize.toString());
    setSearchParams(params);
  };

  /**
   * Silme modalı dışına tıklama işleyicisi
   */
  const handleDeleteModalOutsideClick = (e) => {
    if (e.target.classList.contains("contact-modal-overlay")) {
      cancelDelete();
    }
  };

  /**
   * Form input değişiklik işleyicisi
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: value,
    });
  };

  /**
   * Yeni contact ekleme modalını açar
   */
  const openModal = () => {
    setIsEditing(false);
    setNewItem({
      contact_phone: "",
      contact_email: "",
      contact_location: "",
      contact_whatsapp: "",
      contact_instagram: "",
      contact_facebook: "",
      contact_tiktok: "",
      contact_youtube: "",
      contact_linkedin: "",
    });
    setShowModal(true);
  };

  /**
   * Contact düzenleme modalını açar
   */
  const openEditModal = (item) => {
    setIsEditing(true);
    setNewItem({
      ...item,
    });
    setShowModal(true);
  };

  /**
   * Modalı kapatır
   */
  const closeModal = () => {
    setShowModal(false);
  };

  /**
   * Modal dışına tıklama işleyicisi
   */
  const handleModalOutsideClick = (e) => {
    if (e.target.classList.contains("contact-modal-overlay")) {
      closeModal();
    }
  };

  /**
   * Form gönderme işleyicisi
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form doğrulama
    if (!newItem.contact_email || !newItem.contact_phone) {
      alert("Zəhmət olmasa ən azı email və telefon məlumatlarını daxil edin");
      return;
    }

    try {
      setLoading(true);

      if (isEditing) {
        // Mevcut öğeyi güncelle
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/v1/contact/${newItem.id}`,
          newItem
        );
        alert("Əlaqə məlumatları uğurla yeniləndi");
      } else {
        // Yeni öğe ekle
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/v1/contact`,
          newItem
        );
        alert("Yeni əlaqə məlumatı uğurla əlavə edildi");
      }

      // Verileri yeniden getir
      await fetchContacts();
      closeModal();
    } catch (error) {
      console.error("Contact save error:", error);
      alert("Əməliyyat zamanı xəta baş verdi");
      setLoading(false);
    }
  };

  /**
   * Silme onay modalını açar
   */
  const confirmDelete = (itemId) => {
    setItemToDelete(itemId);
    setShowDeleteConfirm(true);
  };

  /**
   * Silme işlemini iptal eder
   */
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setItemToDelete(null);
  };

  /**
   * Öğeyi siler
   */
  const deleteItem = async () => {
    try {
      setLoading(true);

      // API'dan sil
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/v1/contact/${itemToDelete}`
      );

      alert("Əlaqə məlumatı uğurla silindi");

      // Verileri yeniden getir
      await fetchContacts();

      setShowDeleteConfirm(false);
      setItemToDelete(null);

      // Gerekirse mevcut sayfayı ayarla
      const totalPages = Math.ceil(
        (originalContactsData.length - 1) / pageSize
      );
      if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(totalPages);
      }
    } catch (error) {
      console.error("Contact delete error:", error);
      alert("Silmə əməliyyatı zamanı xəta baş verdi");
      setLoading(false);
    }
  };

  /**
   * Export butonu bileşeni
   * CSV formatında veri dışa aktarma işlevi
   */
  const ExportButton = () => {
    const [isExporting, setIsExporting] = useState(false);

    /**
     * Verileri CSV formatında dışa aktarır
     */
    const handleExport = async () => {
      setIsExporting(true);
      try {
        // Dışa aktarılacak filtrelenmiş verileri al
        let dataToExport = [...originalContactsData];

        // Arama filtresini uygula
        if (searchTerm) {
          dataToExport = dataToExport.filter(
            (item) =>
              (item.contact_email &&
                item.contact_email
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())) ||
              (item.contact_phone &&
                item.contact_phone
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())) ||
              (item.contact_location &&
                item.contact_location
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()))
          );
        }

        // Türkçe/Azerbaycan karakter desteği için UTF-8 BOM ile CSV içeriği oluştur
        const BOM = "\uFEFF"; // Türkçe/Azerbaycan karakter desteği için UTF-8 BOM
        let csvContent =
          BOM +
          "No,Telefon,Email,Ünvan,WhatsApp,Instagram,Facebook,TikTok,YouTube,LinkedIn\n";

        dataToExport.forEach((item, index) => {
          csvContent += `${index + 1},"${item.contact_phone || ""}","${
            item.contact_email || ""
          }","${item.contact_location || ""}","${
            item.contact_whatsapp || ""
          }","${item.contact_instagram || ""}","${
            item.contact_facebook || ""
          }","${item.contact_tiktok || ""}","${item.contact_youtube || ""}","${
            item.contact_linkedin || ""
          }"\n`;
        });

        // UTF-8 kodlaması ile CSV dosyası oluştur ve indir
        const blob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const link = document.createElement("a");
        if (link.download !== undefined) {
          const url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", "contacts.csv");
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      } catch (error) {
        console.error("Export error:", error);
      } finally {
        setIsExporting(false);
      }
    };

    return (
      <button
        className="export-button btn"
        onClick={handleExport}
        disabled={isExporting}
      >
        <img src={ExportIcon} alt="Export" />
        {isExporting ? "Exporting..." : "Export"}
      </button>
    );
  };

  return (
    <div className="contact-page-section">
      {/* Üst bölüm - Başlık ve Export butonu */}
      <section className="top-section">
        <h3>Əlaqə məlumatları</h3>
        <ExportButton />
      </section>

      {/* Orta bölüm - Arama ve ekleme */}
      <section className="middle-section">
        <div className="search-filter-section">
          <div className="input-section">
            <input
              type="text"
              placeholder="Axtar..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <img src={SearchIcon} alt="Search" className="search-icon" />
          </div>
        </div>
        <div className="addition-section">
          <button className="btn addition-button" onClick={openModal}>
            + &nbsp; Əlavə et
          </button>
        </div>
      </section>

      {/* Tablo bölümü - Contact listesi */}
      <section className="table-section">
        {loading ? (
          <div
            className="loading-container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "40px",
              fontSize: "16px",
              color: "var(--primary-text-grey-color)",
            }}
          >
            Yüklənir...
          </div>
        ) : (
          <>
            <table ref={tableRef}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Telefon</th>
                  <th>Email</th>
                  <th>Ünvan</th>
                  <th>WhatsApp</th>
                  <th>Instagram</th>
                  <th>Facebook</th>
                  <th>TikTok</th>
                  <th>YouTube</th>
                  <th>LinkedIn</th>
                  <th>Əməliyyat</th>
                </tr>
              </thead>
              <tbody>
                {contactsData.length === 0 ? (
                  <tr>
                    <td
                      colSpan="11"
                      style={{
                        textAlign: "center",
                        padding: "40px",
                        color: "var(--primary-text-grey-color)",
                      }}
                    >
                      Heç bir əlaqə məlumatı tapılmadı
                    </td>
                  </tr>
                ) : (
                  contactsData.map((item, index) => (
                    <tr key={item?.id}>
                      <td>{(currentPage - 1) * pageSize + index + 1}</td>
                      <td>{item?.contact_phone}</td>
                      <td>{item?.contact_email}</td>
                      <td title={item?.contact_location}>
                        {item?.contact_location?.length > 30
                          ? `${item?.contact_location.substring(0, 30)}...`
                          : item?.contact_location}
                      </td>
                      <td>{item?.contact_whatsapp}</td>
                      <td>
                        {item?.contact_instagram && (
                          <a
                            href={item?.contact_instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Instagram
                          </a>
                        )}
                      </td>
                      <td>
                        {item?.contact_facebook && (
                          <a
                            href={item?.contact_facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Facebook
                          </a>
                        )}
                      </td>
                      <td>
                        {item?.contact_tiktok && (
                          <a
                            href={item?.contact_tiktok}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            TikTok
                          </a>
                        )}
                      </td>
                      <td>
                        {item?.contact_youtube && (
                          <a
                            href={item?.contact_youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            YouTube
                          </a>
                        )}
                      </td>
                      <td>
                        {item?.contact_linkedin && (
                          <a
                            href={item?.contact_linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            LinkedIn
                          </a>
                        )}
                      </td>
                      <td className="actions">
                        <button
                          className="btn delete-button me-2"
                          onClick={() => confirmDelete(item?.id)}
                          title="Əlaqə məlumatını sil"
                        >
                          <img src={DeleteIcon} alt="Delete" />
                        </button>
                        <button
                          className="btn edit-button"
                          onClick={() => openEditModal(item)}
                          title="Əlaqə məlumatını redaktə et"
                        >
                          <img src={EditIcon} alt="Edit" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Sayfalama çubuğu */}
            <div
              className="custom-pagination-bar"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                marginTop: 16,
              }}
            >
              <div style={{ display: "flex", gap: "4px" }}>
                <button
                  style={{
                    width: 32,
                    height: 32,
                    border: "none",
                    background: "none",
                    borderRadius: 4,
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    color: "#000",
                  }}
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  &lt;
                </button>
                {Array.from(
                  { length: Math.max(1, pagination.total_pages) },
                  (_, i) => i + 1
                ).map((page) => (
                  <button
                    key={page}
                    style={{
                      width: 32,
                      height: 32,
                      margin: "0 2px",
                      background: page === currentPage ? "#000" : "none",
                      color: page === currentPage ? "#fff" : "#000",
                      border: "none",
                      borderRadius: 4,
                      cursor: page === currentPage ? "default" : "pointer",
                    }}
                    onClick={() => handlePageChange(page)}
                    disabled={page === currentPage}
                  >
                    {page}
                  </button>
                ))}
                <button
                  style={{
                    width: 32,
                    height: 32,
                    border: "none",
                    background: "none",
                    borderRadius: 4,
                    cursor:
                      currentPage === pagination.total_pages
                        ? "not-allowed"
                        : "pointer",
                    color: "#000",
                  }}
                  disabled={currentPage === pagination.total_pages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  &gt;
                </button>
                <select
                  value={pageSize}
                  onChange={handlePageSizeChange}
                  style={{
                    marginLeft: 12,
                    padding: "4px 8px",
                    borderRadius: 4,
                    height: 32,
                    fontWeight: "normal",
                  }}
                >
                  <option value={20}>20 / page</option>
                  <option value={50}>50 / page</option>
                  <option value={100}>100 / page</option>
                </select>
              </div>
            </div>
          </>
        )}
      </section>

      {/* Ekleme/Düzenleme Modalı */}
      {showModal && (
        <div
          className="contact-modal-overlay"
          onClick={handleModalOutsideClick}
        >
          <div className="contact-modal">
            <div className="contact-modal-header">
              <h4>{isEditing ? "Əlaqə məlumatları" : "Yeni əlaqə"}</h4>
              <button className="close-button" onClick={closeModal}>
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="contact-modal-body">
              <div className="form-row">
                <div className="form-group col-md-6 col-sm-12 col-12">
                  <label>Telefon *</label>
                  <input
                    type="text"
                    name="contact_phone"
                    value={newItem.contact_phone}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    placeholder="+994 XX XXX XX XX"
                  />
                </div>
                <div className="form-group col-md-6 col-sm-12 col-12">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="contact_email"
                    value={newItem.contact_email}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    placeholder="example@domain.com"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12 col-sm-12 col-12">
                  <label>Ünvan</label>
                  <textarea
                    name="contact_location"
                    value={newItem.contact_location}
                    onChange={handleInputChange}
                    className="form-control"
                    rows="3"
                    placeholder="Tam ünvan məlumatı"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6 col-sm-12 col-12">
                  <label>WhatsApp</label>
                  <input
                    type="text"
                    name="contact_whatsapp"
                    value={newItem.contact_whatsapp}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="994XXXXXXXXX"
                  />
                </div>
                <div className="form-group col-md-6 col-sm-12 col-12">
                  <label>Instagram</label>
                  <input
                    type="url"
                    name="contact_instagram"
                    value={newItem.contact_instagram}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="https://www.instagram.com/username/"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6 col-sm-12 col-12">
                  <label>Facebook</label>
                  <input
                    type="url"
                    name="contact_facebook"
                    value={newItem.contact_facebook}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="https://www.facebook.com/username"
                  />
                </div>
                <div className="form-group col-md-6 col-sm-12 col-12">
                  <label>TikTok</label>
                  <input
                    type="url"
                    name="contact_tiktok"
                    value={newItem.contact_tiktok}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="https://www.tiktok.com/@username"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6 col-sm-12 col-12">
                  <label>YouTube</label>
                  <input
                    type="url"
                    name="contact_youtube"
                    value={newItem.contact_youtube}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="https://www.youtube.com/channel/..."
                  />
                </div>
                <div className="form-group col-md-6 col-sm-12 col-12">
                  <label>LinkedIn</label>
                  <input
                    type="url"
                    name="contact_linkedin"
                    value={newItem.contact_linkedin}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="https://www.linkedin.com/company/..."
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn cancel-button"
                  onClick={closeModal}
                  disabled={loading}
                >
                  Ləğv et
                </button>
                <button
                  type="submit"
                  className="btn submit-button"
                  disabled={loading}
                >
                  {loading ? "Yüklənir..." : "Təsdiqlə"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Silme Onay Modalı */}
      {showDeleteConfirm && (
        <div
          className="contact-modal-overlay"
          onClick={handleDeleteModalOutsideClick}
        >
          <div className="delete-confirm-modal">
            <div className="delete-confirm-header">
              <button className="close-button" onClick={cancelDelete}>
                ×
              </button>
              <img
                src={DeleteConfirmModalIcon}
                alt="Delete"
                className="mb-3 mt-4"
              />
              <h4>Məlumatların silinməsi</h4>
            </div>
            <div className="delete-confirm-body">
              <p>Silmək istədiyinizdən əminsinizmi?</p>
              <div className="delete-confirm-actions">
                <button
                  className="btn cancel-button"
                  onClick={cancelDelete}
                  disabled={loading}
                >
                  Ləğv et
                </button>
                <button
                  className="btn delete-confirm-button"
                  onClick={deleteItem}
                  disabled={loading}
                >
                  {loading ? "Yüklənir..." : "Təsdiqlə"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
