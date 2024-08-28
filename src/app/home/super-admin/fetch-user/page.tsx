"use client";
import { Modal, Pagination, Spinner, Table, Tooltip } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { deleteSubAdmin, fetchSubAdminList } from "@/app/api/admin";
import {
  successNotification,
  warningNotification,
} from "@/components/utils/utility";
import NoContacts from "../../HomeLayoutUI/NoContacts";
import { BIG_BUTTON_STYLES } from "@/components/styles/button";
import { TbTrash } from "react-icons/tb";
import {
  contactUs,
  deleteContactMail,
  fetchAllUser,
  fetchContactUs,
} from "@/app/api/contact-us";

const Users = () => {
  const [user, setUser] = useState<any>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const perPage = 10;

  const handleDeleteContactMail = async (id: number) => {
    var response = await deleteContactMail(id);
    response = await response.json();

    console.log(response);
    if (response.status === 201) {
      successNotification(response.message);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else {
      warningNotification(response.message);
    }
  };

  useEffect(() => {
    const handlefetchAllUser = async () => {
      var response = await fetchAllUser(page, perPage);
      response = await response.json();

      console.log(response);
      if (response.status === 200) {
        setUser(response.users);
        setTotalPages(Math.ceil(response.total / perPage)); // Calculate total pages
      } else {
        warningNotification("Network problem!");
      }
    };
    handlefetchAllUser();
  }, [page]);

  return (
    <>
      {user ? (
        <div className="relative w-full h-full dark:bg-dark-glass rounded-md p-4 flex flex-col gap-8 overflow-hidden">
          <div className="flex flex-col gap-4 w-full h-full overflow-y-auto overflow-x-hidden">
            <h1 className="dark:text-slate-300 text-xl text-slate-800 text-center font-medium">
              Contact Us Mails
            </h1>
            <div className="h-4/5">
              <Table hoverable striped>
                <Table.Head className="w-full">
                  <Table.HeadCell className="w-1/9 sticky text-center">
                    ID
                  </Table.HeadCell>
                  <Table.HeadCell className="w-1/9 sticky text-center">
                    Username
                  </Table.HeadCell>
                  <Table.HeadCell className="w-1/9 sticky text-center">
                    Email
                  </Table.HeadCell>
                  <Table.HeadCell className="w-1/9 sticky text-center">
                    Google ID
                  </Table.HeadCell>
                  <Table.HeadCell className="w-1/9 sticky text-center">
                    Role
                  </Table.HeadCell>
                  <Table.HeadCell className="w-1/9 sticky text-center">
                    Created At
                  </Table.HeadCell>
                  <Table.HeadCell className="w-1/9 sticky text-center">
                    Updated At
                  </Table.HeadCell>
                  <Table.HeadCell className="w-1/9 sticky text-center">
                    Image
                  </Table.HeadCell>
                  <Table.HeadCell className="w-1/9 sticky text-center">
                    Stripe ID
                  </Table.HeadCell>
                  <Table.HeadCell className="w-1/9 sticky text-center">
                    Actions
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  {user &&
                    user.map((user: any) => (
                      <Table.Row key={user.id} className="text-center">
                        <Table.Cell>{user.id}</Table.Cell>
                        <Table.Cell>{user.userName}</Table.Cell>
                        <Table.Cell>{user.email}</Table.Cell>
                        <Table.Cell>{user.googleId}</Table.Cell>
                        <Table.Cell>{user.role}</Table.Cell>
                        <Table.Cell>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </Table.Cell>
                        <Table.Cell>
                          {new Date(user.updatedAt).toLocaleDateString()}
                        </Table.Cell>
                        <Table.Cell>image link</Table.Cell>
                        <Table.Cell>{user.stripeCustomerID}</Table.Cell>
                        <Table.Cell>
                          <div className="flex justify-center">
                            <Tooltip
                              content="delete card"
                              className="bg-brand-color text-center"
                              placement="bottom"
                            >
                              <button
                                className="border rounded-full border-red-500 hover:text-red-500"
                                onClick={() => {
                                  handleDeleteContactMail(user.id);
                                }}
                              >
                                <TbTrash className="m-1 transition-fill duration-200 ease-in-out" />
                              </button>
                            </Tooltip>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                </Table.Body>
              </Table>
            </div>

            {/* Pagination Controls */}
            <div className="w-full flex items-center justify-center rounded-md">
              <Pagination
                layout="pagination"
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
                previousLabel="<"
                nextLabel=">"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full rounded-md p-4 flex flex-col items-center justify-center gap-8 overflow-hidden">
          <NoContacts />
        </div>
      )}
    </>
  );
};
export default Users;
