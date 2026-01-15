import { addToast, Button, form, Spinner } from "@heroui/react";
import { RecordDomainType } from "../../../api-client/model/enum/RecordDomainType";
import type { DomainName } from "../../../api-client/model/table/DomainName";
import { useEffect, useState } from "react";
import { AxiosClient } from "../../../api-client/AxiosClient";
import { ZSUtility } from "../zero-service-utility";
import { Database } from "../../../api-client/model/table/Database";
import { ZSDatabaseDeleteModal } from "./ZSDatabaseDeleteModal";
import { ZSDatabaseCreateModal } from "./ZSDatabaseCreateModal";

interface ZSDatabaseViewProps {}

export function ZSDatabaseView(props: ZSDatabaseViewProps) {
  const [list_database, setListDatabase] = useState<Database[]>([]);
  const [create_modal_open, setCreateModalOpen] = useState<boolean>(false);
  const [delete_modal_open, setDeleteModalOpen] = useState<boolean>(false);
  const [selected_db, setSelectedDB] = useState<Database>();

  const [loading, setLoading] = useState<boolean>(false);
  const [loading_submit, setLoadingSubmit] = useState<boolean>(false);
  const [loading_delete, setLoadingDelete] = useState<boolean>(false);

  async function init() {
    try {
      setLoading(true);
      setListDatabase(await AxiosClient.getDatabases({ headers: { authorization: ZSUtility.getToken() } }));
    } catch (err: any) {
      addToast({
        title: 'Error',
        description: err?.response?.data?.toString()
      });
    } finally {
      setLoading(false);
    }
  }

  async function createDatabase() {
    try {
      setLoadingSubmit(true);
      await AxiosClient.createDatabase({ headers: { authorization: ZSUtility.getToken()} });
      await init();
      addToast({
        title: 'Database succesfully created'
      });
      setCreateModalOpen(false);
    } catch (err: any) {
      addToast({
        title: 'Error',
        description: err?.response?.data?.toString()
      });
    } finally {
      setLoadingSubmit(false);
    }
  }

  async function deleteDatabase() {
    if (!selected_db) {
      return;
    }
    try {
      setLoadingDelete(true);
      await AxiosClient.deleteDatabase({
        headers: { authorization: ZSUtility.getToken() },
        path: { id: selected_db.id }
      });
      addToast({
        title: 'Database deleted',
        description: `Database ${selected_db.db_name} permanently deleted`
      });
      await init();
      setDeleteModalOpen(false);
    } catch (err: any) {
      addToast({
        title: 'Error',
        description: err?.response?.data?.toString()
      });
    } finally {
      setLoadingDelete(false);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2">
        <Button 
          variant="shadow"
          color="danger"
          className="self-start mb-1"
          isLoading={loading_submit}
          onPress={() => setCreateModalOpen(true)}>
          + Add New Database
        </Button>
        { loading && <Spinner color={'warning'} className="self-start" /> }
        {
          !loading && list_database.map(db => (
            <div
              key={db.id}
              className={`
                bg-[#FFF1] flex flex-col gap-0 p-[12px_16px] rounded-2xl
                lg:flex-row lg:items-start lg:justify-between
              `}>
              <div className="flex flex-col items-start gap-[3px] w-full">
                <div className="flex items-center gap-2">
                  <img 
                    className="w-6 h-6 object-contain"
                    src={'/db.svg'} />
                  <div className="text-sm font-bold text-red-400">
                    { db.db_type }
                  </div>
                </div>
                <div className="text-yellow-300 font-mono mb-1">
                  { db.db_host }:{ db.db_port }
                </div>
                <div className={`
                  text-sm text-zinc-400 bg-[#FFF1] p-[2px_7px] rounded-md flex flex-col
                  md:flex-row md:gap-1
                `}>
                  <div>
                    dbname — 
                  </div>
                  <div className="font-mono text-white font-semibold break-all">
                    { db.db_name }
                  </div>
                </div>
                <div className={`
                  text-sm text-zinc-400 bg-[#FFF1] p-[2px_7px] rounded-md flex flex-col
                  md:flex-row md:gap-1
                `}>
                  <div>
                    username —
                  </div>
                  <div className="font-mono text-white font-semibold break-all">
                    { db.db_username }
                  </div>
                </div>
                <div className={`
                  text-sm text-zinc-400 bg-[#FFF1] p-[2px_7px] rounded-md flex flex-col
                  md:flex-row md:gap-1
                `}>
                  <div>
                    password — 
                  </div>
                  <div className="font-mono text-white font-semibold break-all">
                    { db.db_password }
                  </div>
                </div>
              </div>
              <div className={`
                flex items-center gap-2 mt-2
                lg:mt-0
              `}>
                <Button 
                  onPress={() => {
                    setSelectedDB(db);
                    setDeleteModalOpen(true);
                  }}
                  className="!min-w-0 !w-10 !px-0">
                  <img 
                    className="w-5 h-5 object-contain"
                    src={'/trash-yellow.svg'} />
                </Button>
              </div>
            </div>
          ))
        }
        <div className="text-zinc-500 italic">
          You can add up to { ZSUtility.getUser()?.max_database_allowed } database.
        </div>
      </div>
      { selected_db && <ZSDatabaseDeleteModal
        data={selected_db}
        open={delete_modal_open} 
        setOpen={setDeleteModalOpen}
        loading={loading_delete}
        onYes={deleteDatabase} /> }
      <ZSDatabaseCreateModal
        open={create_modal_open}
        setOpen={setCreateModalOpen}
        loading={loading_submit}
        onContinue={createDatabase} />
    </>
  );
}
