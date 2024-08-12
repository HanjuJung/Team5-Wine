'use client';

import { useEffect, useState } from 'react';
import { wineListAPI } from '@/api/Wine';
import { wine } from '@/types/WineProps';
import ModalDeleteWine from '@/components/modal/modaldelete/winedelete/ModalWineDelete';
import ModalEdit from '@/components/modal/modaledit/ModalEdit';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wines, setWines] = useState<wine[]>();
  const [selectedWineId, setSelectedWineId] = useState<number | null>(null);

  function closeModal() {
    setIsModalOpen(false);
    setSelectedWineId(null);
  }

  const openDeleteModal = (id: number) => {
    setIsModalOpen(true);
    setSelectedWineId(id);
  };

  useEffect(() => {
    async function fetchWine() {
      try {
        const res = await wineListAPI(30);
        setWines(res.list);
        console.log(res.list);
      } catch (e) {
        console.error('Error fetching wine detail:', e);
      }
    }
    fetchWine();
  }, [selectedWineId]);

  return (
    <>
      <div>
        {wines &&
          wines.map((wine) => (
            <div key={wine.id}>
              <h4>{wine.name}</h4>
              <p>가격: ₩{wine.price.toLocaleString()}</p>
              <p>등급: {wine.avgRating}</p>
              <p>아이디: {wine.id}</p>
              <button onClick={() => openDeleteModal(wine.id)}>수정하기</button>
              {selectedWineId === wine.id && <ModalEdit isModalOpen={isModalOpen} closeModal={closeModal} id={wine.id} />}
            </div>
          ))}
      </div>
    </>
  );
}
