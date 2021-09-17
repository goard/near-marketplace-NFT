import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";

const InfoNft = (props) => {
  const { nft } = props;
  return (
    <Card>
      <CardHeader title="Информация" subheader="NFT token" />
      <Divider />
      <CardContent>
        <Typography>Владелец</Typography>
        <Typography>{nft.owner_id}</Typography>
        <Divider />
        <Typography>Цена</Typography>
        <Typography style={{ color: "#e6b000" }}>{nft.price} BNB</Typography>
        <Divider />
      </CardContent>
      <CardActions style={{ flexDirection: "column" }}>
        <Button
          color="primary"
          // disabled={isSubmitting}
          size="large"
          type="submit"
          variant="contained"
        >
          Купить
        </Button>
      </CardActions>
    </Card>
  );
};

export default InfoNft;
