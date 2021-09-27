import { render, screen } from "@testing-library/react";
import { getSession, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { mocked } from "ts-jest/utils";
import Post, { getStaticProps } from "../../pages/posts/preview/[slug]";
import { getPrismicClient } from "../../services/prismic";

const post = {
  slug: "my-new-post",
  title: "my new post",
  content: "<p>Post excerpt</p>",
  updatedAt: "March, 10",
};

jest.mock("next-auth/client");
jest.mock("next/router");

jest.mock("../../services/prismic.ts");

describe("Post Preview page", () => {
  it("renders correctly", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<Post post={post} />);

    expect(screen.getByText("my new post")).toBeInTheDocument();
    expect(screen.getByText("Post excerpt")).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading")).toBeInTheDocument();
  });

  it("redirects user to full post when user is subscribed", async () => {
    const getSessionMocked = mocked(useSession);
    const userRouterMocked = mocked(useRouter);

    const pushMock = jest.fn();

    getSessionMocked.mockReturnValueOnce([
      { activeSubscription: "fake-active-subscription" },
      false,
    ] as any);

    userRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<Post post={post} />);

    expect(pushMock).toHaveBeenCalledWith("/posts/my-new-post");
  });

  it("loads initial data", async () => {
    const getPrismicMocked = mocked(getPrismicClient);

    getPrismicMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            {
              type: "heading",
              text: "my new post",
            },
          ],
          content: [{ type: "paragraph", text: "Post excerpt" }],
        },
        last_publication_date: "04-01-2021",
      }),
    } as any);

    const response = await getStaticProps({
      params: { slug: "my-new-post" },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: "my-new-post",
            title: "my new post",
            content: "<p>Post excerpt</p>",
            updatedAt: "01 de abril de 2021",
          },
        },
      })
    );
  });
});
